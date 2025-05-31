import { CdReqBody } from "../types/requests.js";
import constructFilepath from "../utils/constructFilepath.js";
import doesPathExist from "../utils/doesPathExist.js";
import { AppError } from "../middleware/errorHandler.js";
import { join, relative } from "path";
import { TerminalResBody } from "../types/responses.js";

/**
 * Function to handle the logic of the cd shell command. Only need to verify
 * that the path is a valid path to change to
 * @param reqBody request body for cd command
 * @returns Promise to a response body object
 */
export async function doCd(reqBody: CdReqBody): Promise<TerminalResBody> {
  // store filepath to cd
  const filePath: string = constructFilepath(reqBody.cwd, reqBody.path);

  // check that path exists
  const pathExists: boolean = await doesPathExist(filePath);

  // handle case where path doesn't exist
  if (!pathExists) {
    const err: AppError = new Error(`Invalid filepath: ${reqBody.path}`);
    err.status = 404;
    throw err;
  }

  // get directory to filesystem
  const rootDir = join(process.cwd(), "fileSystem");

  // get abs path for new cwd ("." if we're just in the root)
  const newCwd: string =
    relative(rootDir, filePath).length > 0 ? relative(rootDir, filePath) : "/";

  // indicate that path was ok
  return { success: true, data: newCwd };
}
