import { readdir } from "fs/promises";
import { LsReqBody } from "../types/requests.js";
import { LsResBody } from "../types/responses.js";
import constructFilepath from "../utils/constructFilepath.js";
import doesPathExist from "../utils/doesPathExist.js";
import { AppError } from "../middleware/errorHandler.js";

// function to handle the logic of the ls shell command
export async function doLs(reqBody: LsReqBody): Promise<LsResBody> {
  // store filepath to ls
  const filePath: string = constructFilepath(reqBody.cwd, reqBody.path);

  // check that path exists
  const pathExists: boolean = await doesPathExist(filePath);

  // handle case where path doesn't exist
  if (!pathExists) {
    const err: AppError = new Error(`Invalid filepath: ${reqBody.path}`);
    err.status = 404;
    throw err;
  }

  // get all subDirectories
  const subDirectories: string[] = await readdir(filePath);

  // convert subDirectories into string with newlines
  return { success: true, data: subDirectories.join("\n"), path: reqBody.path };
}
