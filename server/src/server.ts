import express from "express";
import cors from "cors";
import config from "./config/config";
import terminalRouter from "./routing/terminalRouter";

const app = express();

// parse request into json
app.use(express.json());

app.use("/api", terminalRouter);
