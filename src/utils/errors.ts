import type { NextFunction, Request, Response } from "express";
import guildLogger from "./logger.js";

class ErrorWithCode extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

const handleControllerError =
  <Res extends Response, Req extends Request>(
    controller: (req: Req, res: Res, next: NextFunction) => Promise<void>
  ) =>
  async (req: Req, res: Res, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      guildLogger.warn("Controller error", {
        error,
        url: req.url,
        correlationId: req.headers["x-correlation-id"],
      });
      next(error);
    }
  };

export { ErrorWithCode, handleControllerError };
