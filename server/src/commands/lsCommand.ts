import { readdir } from "fs/promises";
import { LsReqBody } from "../types/requests";
import { LsResBody } from "../types/responses";
import { join } from "path";

export async function doLs(reqBody: LsReqBody): Promise<LsResBody> {
  // get all subDirectories
  const subDirectories: string[] = await readdir(
    join("fileSystem", reqBody.cwd, reqBody.path)
  );

  // convert subDirectories into string with newlines
  return { success: true, data: subDirectories.join("\n"), path: reqBody.path };
}
