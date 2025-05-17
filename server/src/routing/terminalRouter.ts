import { Router, Request, Response, NextFunction } from "express";
import { LsResBody } from "../types/responses.js";
import checkAuth from "../middleware/authMiddleware.js";
import { AppError } from "../middleware/errorHandler.js";

const terminalRouter = Router();

// add auth middleware
terminalRouter.use(checkAuth);

terminalRouter.get("/ls", (req: Request, res: Response, next: NextFunction) => {
  // const response: LsResBody = doLs();
  const response: LsResBody = { data: "Hello World", success: true };
  res.json(response);
});

export default terminalRouter;
