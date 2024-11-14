import cors from "cors";
import express from "express";
import correlator from "express-correlation-id";
import router from "./api/index.js";
import config from "./config.js";
import guildLogger from "./utils/logger.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(correlator());

// Routes
app.use(router);

// Graceful shutdown handler
const gracefulShutdown = async (signal: string) => {
  guildLogger.info(`${signal} received`, { pid: process.pid });
  process.exit(0);
};

process.once("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.once("SIGINT", () => gracefulShutdown("SIGINT"));

// Start server
app.listen(config.port, () => {
  guildLogger.info(`Server listening at http://localhost:${config.port}`);
});
