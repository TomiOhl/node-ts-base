import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ErrorHandledByExpress } from "../types/errors.js";
import guildLogger from "../utils/logger.js";

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ErrorHandledByExpress) {
    error.log(res.locals?.fullRoute);
    res.status(error.params.statusCode).json({
      error: error.params.clientMessage,
    });
    return;
  }

  // Handle unexpected errors
  guildLogger.error("Uncaught error", {
    error,
    route: res.locals?.fullRoute,
    correlationId: req.headers["x-correlation-id"],
  });

  res.status(500).json({
    error: "Internal server error",
  });
};
