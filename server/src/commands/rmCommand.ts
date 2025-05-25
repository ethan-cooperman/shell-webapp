import { unlink } from "fs/promises";
import { RmReqBody } from "../types/requests.js";
import { RmResBody } from "../types/responses.js";
import constructFilepath from "../utils/constructFilepath.js";
import doesPathExist from "../utils/doesPathExist.js";
import { AppError } from "../middleware/errorHandler.js";

// function to handle the logic of the rm shell command
export async function doRm(reqBody: RmReqBody): Promise<RmResBody> {
  // store filepath to rm
  const filePath: string = constructFilepath(reqBody.cwd, reqBody.file);

  // check that path exists
  const pathExists: boolean = await doesPathExist(filePath);

  // handle case where path doesn't exist
  if (!pathExists) {
    const err: AppError = new Error(`Invalid file: ${reqBody.file}`);
    err.status = 404;
    throw err;
  }

  // remove file
  await unlink(filePath);

  // convert subDirectories into string with newlines
  return {
    success: true,
    file: reqBody.file,
    data: "File deleted successfully",
  };
}
