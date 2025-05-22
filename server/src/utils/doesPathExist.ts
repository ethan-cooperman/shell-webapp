import { resolve, join, sep } from "path";
import { access, constants } from "fs/promises";

/**
 * Function that checks whether a path exists
 * @param path string filepath. Should already be parsed to be a path
 * relative to the root
 */
export default async function doesPathExist(path: string): Promise<boolean> {
  // get cwd of server program
  const rootDir = join(process.cwd(), "fileSystem");

  // get physical path
  let absPath = resolve(rootDir, path);

  // Ensure absPath is within rootDir. This is ok because filepath should
  // only be physical path at this point
  if (!absPath.startsWith(rootDir)) {
    // Not allowed to escape rootDir
    return false;
  }

  try {
    // Try to see if absPath exists
    await access(absPath, constants.R_OK);

    // Return true if this works
    return true;
  } catch (err: any) {
    if (err.code === "ENOENT") {
      // If file does not exist, return false
      return false;
    }
    throw err;
  }
}
