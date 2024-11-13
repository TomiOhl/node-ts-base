import logger from "@guildxyz/logging";
import correlator from "express-correlation-id";
import config from "../config.js";

const guildLogger = new logger.GuildLogger({
  correlator,
  json: config.logs.json,
  level: config.logs.level,
  silent: config.logs.silent,
  pretty: config.logs.pretty,
});

export default guildLogger;
