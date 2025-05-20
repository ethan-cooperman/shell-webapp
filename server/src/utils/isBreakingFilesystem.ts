import { resolve, join } from "path";

// checks whether the filepath breaks out of the fileSystem directory that contains the root directory
export default function isBreakingFilesystem(filepath: string): boolean {
  // get root dir
  const rootDir = process.cwd();

  // get abs path of filepath
  const absPath = resolve(join(rootDir, "fileSystem", filepath));

  // ensure abs path is not breaking out of fileSystem directory
  return !absPath.startsWith(join(rootDir, "fileSystem"));
}
