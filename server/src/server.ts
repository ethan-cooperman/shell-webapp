import express from "express";
import config from "./config/config.js";
import cors from "cors";
import terminalRouter from "./routing/terminalRouter.js";
import handleError from "./middleware/errorHandler.js";

const app = express();

// handle cors middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);

// parse request into json
app.use(express.json());

// home page
app.get("/", (req, res) => {
  res.send("<h1>File System API</h1>");
});

// route requests
app.use("/api", terminalRouter);

// handle errors
app.use(handleError);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
