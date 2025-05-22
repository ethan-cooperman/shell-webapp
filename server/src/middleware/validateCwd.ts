import { Request, Response, NextFunction } from "express";
import { AppError } from "./errorHandler.js";
import doesPathExist from "../utils/doesPathExist.js";

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
    const pathExists: boolean = await doesPathExist(cwd);

    // handle case where cwd doesn't exist
    if (!pathExists) {
      const err: AppError = new Error(`Invalid cwd filepath: ${cwd}`);
      err.status = 400;
      return next(err);
    }

    return next();
  } catch (err) {
    next(err);
  }
}
