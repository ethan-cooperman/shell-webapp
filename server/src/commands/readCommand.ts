import { ReadReqBody } from "../types/requests.js";
import { ReadResBody } from "../types/responses.js";
import constructFilepath from "../utils/constructFilepath.js";
import doesPathExist from "../utils/doesPathExist.js";
import { AppError } from "../middleware/errorHandler.js";
import { FileHandle, open, readFile } from "fs/promises";

// function to handle the logic of file reading
export async function doRead(reqBody: ReadReqBody): Promise<ReadResBody> {
  // store filepath to read
  const filePath: string = constructFilepath(reqBody.cwd, reqBody.file);

  // check that path exists
  const pathExists: boolean = await doesPathExist(filePath);

  // handle case where path doesn't exist
  if (!pathExists) {
    const err: AppError = new Error(`Invalid file: ${reqBody.file}`);
    err.status = 404;
    throw err;
  }

  // get contents of file
  let fileContents: string;

  // if number of bytes is given
  if ("numBytes" in reqBody && typeof reqBody.numBytes === "number") {
    // open file
    const targetFileHandle: FileHandle = await open(filePath, "r");

    // allocate buffer to read into
    const readBuffer: Buffer = Buffer.alloc(reqBody.numBytes);

    // determine if we need an offset
    const filePosition: number =
      "offset" in reqBody && typeof reqBody.offset === "number"
        ? reqBody.offset
        : 0;

    try {
      // read into buffer
      await targetFileHandle.read(
        readBuffer,
        0,
        reqBody.numBytes,
        filePosition
      );
      fileContents = readBuffer.toString();
    } finally {
      // close file descriptor no matter what
      await targetFileHandle.close();
    }
  } else {
    fileContents = await readFile(filePath, "utf-8");
  }

  // return succcess object
  return {
    success: true,
    data: fileContents,
    file: reqBody.file,
    offset: reqBody.offset,
    numBytes: reqBody.numBytes,
  };
}
