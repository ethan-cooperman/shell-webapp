import { Router, Request, Response, NextFunction } from "express";
import {
  ReadResBody,
  CdResBody,
  LsResBody,
  MkdirResBody,
  RmResBody,
  WriteResBody,
  RmdirResBody,
} from "../types/responses.js";
import checkAuth from "../middleware/authMiddleware.js";
import handleError, { AppError } from "../middleware/errorHandler.js";
import { LockManager } from "../utils/lockManager.js";
import checkCwd from "../middleware/validateCwd.js";
import { doLs } from "../commands/lsCommand.js";
import {
  isReadReqBody,
  isCdReqBody,
  isLsReqBody,
  isMkdirReqBody,
  isRmReqBody,
  isWriteReqBody,
  isRmdirReqBody,
} from "../types/requests.js";
import { doCd } from "../commands/cdCommand.js";
import { doRead } from "../commands/readCommand.js";
import { doMkdir } from "../commands/mkdirCommand.js";
import { doRm } from "../commands/rmCommand.js";
import { doWrite } from "../commands/writeCommand.js";
import { doRmdir } from "../commands/rmdirCommand.js";

// router
const terminalRouter = Router();

// lock manager
export const lockManager = new LockManager();

// add auth middleware
terminalRouter.use(checkAuth);

// add cwd validating middleware
terminalRouter.use(checkCwd);

terminalRouter.post(
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

terminalRouter.post(
  "/cd",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // check that body is the correct form
      if (isCdReqBody(req.body)) {
        // get cd string
        const response: CdResBody = await doCd(req.body);
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

terminalRouter.post(
  "/read",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // check that body is the correct form
      if (isReadReqBody(req.body)) {
        // get cat response
        const response: ReadResBody = await doRead(req.body);
        res.json(response);
      } else {
        const err: AppError = new Error(
          "Invalid request body: expected { cwd: string, file: string }"
        );
        err.status = 400;
        throw err;
      }
    } catch (err) {
      next(err);
    }
  }
);

terminalRouter.post(
  "/mkdir",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // check that body is the correct form
      if (isMkdirReqBody(req.body)) {
        // get mkdir response
        const response: MkdirResBody = await doMkdir(req.body);
        res.json(response);
      } else {
        const err: AppError = new Error(
          "Invalid request body: expected { cwd: string, name: string }"
        );
        err.status = 400;
        throw err;
      }
    } catch (err) {
      next(err);
    }
  }
);

terminalRouter.post(
  "/write",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // check that body is the correct form
      if (isWriteReqBody(req.body)) {
        // get rm response
        const response: WriteResBody = await doWrite(req.body);
        res.json(response);
      } else {
        const err: AppError = new Error(
          "Invalid request body: expected { cwd: string, file: string, contents: string }"
        );
        err.status = 400;
        throw err;
      }
    } catch (err) {
      next(err);
    }
  }
);

terminalRouter.delete(
  "/rm",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // check that body is the correct form
      if (isRmReqBody(req.body)) {
        // get rm response
        const response: RmResBody = await doRm(req.body);
        res.json(response);
      } else {
        const err: AppError = new Error(
          "Invalid request body: expected { cwd: string, file: string }"
        );
        err.status = 400;
        throw err;
      }
    } catch (err) {
      next(err);
    }
  }
);

terminalRouter.delete(
  "/rmdir",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // check that body is the correct form
      if (isRmdirReqBody(req.body)) {
        // get rm response
        const response: RmdirResBody = await doRmdir(req.body);
        res.json(response);
      } else {
        const err: AppError = new Error(
          "Invalid request body: expected { cwd: string, name: string }"
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
