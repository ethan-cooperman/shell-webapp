import { MkdirReqBody } from "../types/requests.js";
import { TerminalResBody } from "../types/responses.js";
import constructFilepath from "../utils/constructFilepath.js";
import doesPathExist from "../utils/doesPathExist.js";
import { AppError } from "../middleware/errorHandler.js";
import { dirname } from "path";
import { mkdir } from "fs/promises";

/**
 * function to handle the logic of the mkdir shell command
 * @param reqBody request body for this mkdir request
 * @returns mkdir response
 */
export async function doMkdir(reqBody: MkdirReqBody): Promise<TerminalResBody> {
  // store filepath to mkdir
  const filePath: string = constructFilepath(reqBody.cwd, reqBody.name);

  // check that path exists up to new file to be created
  const parentDir: string = dirname(filePath);
  const pathExists: boolean = await doesPathExist(parentDir);

  // handle case where path doesn't exist
  if (!pathExists) {
    const err: AppError = new Error(`Invalid file: ${reqBody.name}`);
    err.status = 404;
    throw err;
  }

  // create new directory
  await mkdir(filePath);

  // return succcess object
  return {
    success: true,
    data: "Directory created successfully",
  };
}
