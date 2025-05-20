import { join } from "path";
import { access, constants } from "fs/promises";
import { Request, Response, NextFunction } from "express";
import { AppError } from "./errorHandler";
import isBreakingFilesystem from "../utils/isBreakingFilesystem.js";

// Confirms that cwd exists
async function validateCwd(cwd: string): Promise<void> {
  try {
    if (isBreakingFilesystem(cwd)) {
      const err: AppError = new Error(`Invalid cwd filepath: ${cwd}`);
      err.status = 400;
      throw err;
    }

    // Confirm we can read cwd
    await access(join("fileSystem", cwd), constants.R_OK);
  } catch (err) {
    throw err;
  }
}

export default async function checkCwd(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // if no cwd is given, error
  if (!req.body || !req.body.cwd) {
    const error: AppError = new Error("Missing required parameter: cwd");
    error.status = 400;
    return next(error);
  }

  const cwd: string = req.body.cwd;

  // confirm cwd is valid
  try {
    // validate cwd
    await validateCwd(cwd);

    // if this all works, move on
    next();
  } catch (err) {
    next(err);
  }
}
