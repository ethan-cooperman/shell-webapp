import { rmdir } from "fs/promises";
import { RmdirReqBody } from "../types/requests.js";
import { TerminalResBody } from "../types/responses.js";
import constructFilepath from "../utils/constructFilepath.js";
import doesPathExist from "../utils/doesPathExist.js";
import { AppError } from "../middleware/errorHandler.js";

/**
 * function to handle the logic of rmdir request
 * @param reqBody object representation of this rmdir request
 * @returns rmdir response
 */
export async function doRmdir(reqBody: RmdirReqBody): Promise<TerminalResBody> {
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
  return {
    success: true,
    data: "Directory deleted successfully",
  };
}
