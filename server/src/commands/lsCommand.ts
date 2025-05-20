import { readdir } from "fs/promises";
import { LsReqBody } from "../types/requests";
import { LsResBody } from "../types/responses";
import { join } from "path";
import isBreakingFilesystem from "../utils/isBreakingFilesystem.js";

export async function doLs(reqBody: LsReqBody): Promise<LsResBody> {
  // store filapth to ls
  let filePath = join("fileSystem", reqBody.cwd, reqBody.path);

  // don't let user break out of fileSystem directory
  if (isBreakingFilesystem(filePath)) {
    filePath = "fileSystem";
  }

  // get all subDirectories
  const subDirectories: string[] = await readdir(filePath);

  // convert subDirectories into string with newlines
  return { success: true, data: subDirectories.join("\n"), path: reqBody.path };
}
