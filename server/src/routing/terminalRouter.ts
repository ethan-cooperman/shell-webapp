import { Router, Request, Response, NextFunction } from "express";
import { LsResBody } from "../types/responses.js";
import checkAuth from "../middleware/authMiddleware.js";
import handleError, { AppError } from "../middleware/errorHandler.js";
import { LockManager } from "../utils/lockManager.js";
import checkCwd from "../middleware/validateCwd.js";
import { doLs } from "../commands/lsCommand.js";
import { isLsReqBody } from "../types/requests.js";
import isBreakingFilesystem from "../utils/isBreakingFilesystem.js";
import { join } from "path";

// router
const terminalRouter = Router();

// lock manager
export const lockManager = new LockManager();

// add auth middleware
terminalRouter.use(checkAuth);

// add cwd validating middleware
terminalRouter.use(checkCwd);

terminalRouter.get(
  "/ls",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // check that body is the correct form
      if (isLsReqBody(req.body)) {
        // get ls string
        const response: LsResBody = await doLs(req.body);
        res.json(response);
      } else {
        const err: AppError = new Error(
          "Invalid request body: expected { cwd: string, path: string }"
        );
        err.status = 400;
        throw err;
      }
    } catch (err) {
      next(err);
    }
  }
);

// error handler
terminalRouter.use(handleError);

export default terminalRouter;
