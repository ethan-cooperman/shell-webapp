import express, { Router, Request, Response, NextFunction } from "express";
import authenticate from "../utils/authenticate";

function checkAuth(req: Request, res: Response, next: NextFunction): void {
  // get auth token
  const authHeader = req.headers.authorization;

  // if no auth provided
  if (!authHeader || !authHeader.startsWith("ApiKey")) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  // proceed if token is correct, otherwise resolve
  if (token && authenticate(token)) {
    next();
  } else {
    res.status(403).json({ error: "Forbidden: Invalid token" });
  }
}

const terminalRouter = Router();

// add auth middleware
terminalRouter.use(checkAuth);

terminalRouter.get("/ls", (req: Request, res: Response) => {});

export default terminalRouter;
