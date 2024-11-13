import { LogLevel } from "@guildxyz/logging";
import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
if (process.env.NODE_ENV === "development") {
  dotenv.config();
}

export default {
  port: process.env.PORT || 3000,
  // Used by the logger
  logs: {
    level: (process.env.LOG_LEVEL || "verbose") as LogLevel,
    json: (process.env.JSON_LOGS?.toLowerCase() ?? "true") === "true",
    pretty: process.env.PRETTY_LOGS?.toLowerCase() === "true" || false,
    queries: process.env.LOG_SQL_QUERIES?.toLowerCase() === "true" || false,
    silent: (process.env.LOG_SILENT ?? "false") === "true",
  },
};
