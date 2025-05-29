import { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
  status?: number;
}
/**
 * Error handler middleware
 */
export default function handleError(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
}
