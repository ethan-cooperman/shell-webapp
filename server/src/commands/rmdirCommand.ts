import { rmdir } from "fs/promises";
import { RmdirReqBody, RmReqBody } from "../types/requests.js";
import { RmdirResBody, RmResBody } from "../types/responses.js";
import constructFilepath from "../utils/constructFilepath.js";
import doesPathExist from "../utils/doesPathExist.js";
import { AppError } from "../middleware/errorHandler.js";

// function to handle the logic of the rm shell command
export async function doRmdir(reqBody: RmdirReqBody): Promise<RmdirResBody> {
  // store filepath to rm
  const filePath: string = constructFilepath(reqBody.cwd, reqBody.name);

  // check that path exists
  const pathExists: boolean = await doesPathExist(filePath);

  // handle case where path doesn't exist
  if (!pathExists) {
    const err: AppError = new Error(`Invalid file: ${reqBody.name}`);
    err.status = 404;
    throw err;
  }

  // remove file
  await rmdir(filePath);

  // convert subDirectories into string with newlines
  return { success: true, name: reqBody.name };
}
