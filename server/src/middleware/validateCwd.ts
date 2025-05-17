import { basename, dirname } from "path";

function validateCwd(cwd: string): boolean {
  // get basename and dirname of this path for later
  const cwdBasename: string = basename(cwd);
  const cwdDirname: string = dirname(cwd);
}
