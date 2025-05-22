import { resolve, join } from "path";

/**
 * given a cwd and a path, calculates the correct path
 * @param cwd cwd given by the client
 * @param filepath filepath from the client in the context of the cwd
 * @returns a string of the actual filepath to use
 */
export default function constructFilepath(
  cwd: string,
  filepath: string
): string {
  // get cwd of server program
  const rootDir = process.cwd();

  // start of path in the eyes of the client, '/' indicates starting from root directory
  const pathStart: string = filepath.startsWith("/")
    ? join(rootDir, "fileSystem")
    : join(rootDir, "fileSystem", cwd);

  // get abs path of filepath (allows us to prevent breaking out)
  const absPath = resolve(join(pathStart, filepath));

  // if path breaks out, give root directory of fileSystem
  if (!absPath.startsWith(join(rootDir, "fileSystem"))) {
    return join(rootDir, "fileSystem");
  } else {
    return absPath;
  }
}
