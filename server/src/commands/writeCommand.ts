import { WriteReqBody } from "../types/requests.js";
import { TerminalResBody } from "../types/responses.js";
import constructFilepath from "../utils/constructFilepath.js";
import doesPathExist from "../utils/doesPathExist.js";
import { AppError } from "../middleware/errorHandler.js";
import { dirname } from "path";
import { open, FileHandle } from "fs/promises";
/**
 * function to handle the logic of writing to a file
 * @param reqBody object representation of this write request
 * @returns write response object
 */
export async function doWrite(reqBody: WriteReqBody): Promise<TerminalResBody> {
  // store filepath to write
  const filePath: string = constructFilepath(reqBody.cwd, reqBody.file);

  // check that path exists up to file (may need to be created, which is ok)
  const parentDir: string = dirname(filePath);
  const pathExists: boolean = await doesPathExist(parentDir);

  // handle case where path doesn't exist
  if (!pathExists) {
    const err: AppError = new Error(`Invalid file: ${reqBody.file}`);
    err.status = 404;
    throw err;
  }

  // determine open modes and file offsets
  let openMode: string;
  let filePosition: number | undefined;

  if (
    "append" in reqBody &&
    typeof reqBody.append === "boolean" &&
    reqBody.append
  ) {
    openMode = "a+";
    filePosition = undefined;
  } else if ("offset" in reqBody && typeof reqBody.offset === "number") {
    openMode = "r+";
    filePosition = reqBody.offset;
  } else {
    openMode = "w+";
    filePosition = undefined;
  }

  // allocate buffer to exact size of write
  const writeBuffer =
    "numBytes" in reqBody && typeof reqBody.numBytes === "number"
      ? Buffer.alloc(reqBody.numBytes)
      : Buffer.alloc(reqBody.contents.length);

  // populate buffer
  writeBuffer.write(reqBody.contents);

  // open file
  const targetFileHandle: FileHandle = await open(filePath, openMode);

  try {
    // write to file
    await targetFileHandle.write(
      writeBuffer,
      0,
      writeBuffer.length,
      filePosition
    );
  } finally {
    // close file
    await targetFileHandle.close();
  }

  // return succcess object
  return {
    success: true,
    data: "Write successful",
  };
}
