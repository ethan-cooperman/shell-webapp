import { Request, Response, NextFunction } from "express";
import authenticate from "../utils/authenticate.js";
import { AppError } from "./errorHandler.js";

export default function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // get auth token
  const authHeader = req.headers.authorization;

  // if no auth provided
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    const error: AppError = new Error("Unauthorized: No token provided");
    error.status = 401;
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  // proceed if token is correct, otherwise resolve
  if (token && authenticate(token)) {
    next();
  } else {
    const error: AppError = new Error("Forbidden: Invalid Token");
    error.status = 403;
    return next(error);
  }
}
