/* eslint-disable max-classes-per-file */
import { LogLevel } from "@guildxyz/logging";
import { AxiosError } from "axios";
import guildLogger from "../utils/logger.js";

export type ErrorParams<LogParams extends Record<string, any> = {}> = {
  clientMessage: string;
  logMessage?: string;
  statusCode?: number;
  logLevel?: LogLevel;
  logParams?: LogParams;
};

const defaultErrorParams: ErrorParams = {
  clientMessage: "Unknown error",
  logMessage: "Unknown error",
  statusCode: 500,
  logLevel: "error",
  logParams: {},
};

/**
 * General ancestor for all error classes, that we want the express
 * error handlers to handle
 *
 * It will handle other ones as well, but only as "uncaught error".
 * Instances of this error class are expected to be handled by
 * that error handler, other ones are not
 *
 * If we want a controller to propagate these errors to the
 * handler, we need two things:
 *
 * 1) Wrap the controller inside `handleControllerError`. This will
 * propagate any uncaught errors from the controller
 * to express error handlers
 *
 * 2) Make sure, the controller throws instances of these errors,
 * and doesn't handle them itself. This probably just means, that
 * we need to put this at the start of the controller's `catch` block:
 * ```
 * if (error instanceof ErrorHandledByExpress) {
 *  throw error;
 * }
 * ```
 */
export class ErrorHandledByExpress<
  LogParams extends Record<string, any> = Record<string, any>,
> extends Error {
  readonly params: ErrorParams<LogParams>;

  constructor({
    clientMessage,
    statusCode,
    logLevel,
    logMessage,
    logParams,
  }: ErrorParams<LogParams>) {
    const errorMsg = clientMessage ?? defaultErrorParams.clientMessage;
    super(errorMsg);
    this.params = {
      clientMessage: errorMsg,
      statusCode: statusCode ?? defaultErrorParams.statusCode,
      logLevel: logLevel ?? defaultErrorParams.logLevel,
      logMessage: logMessage ?? defaultErrorParams.logMessage,
      logParams: logParams ?? (defaultErrorParams.logParams as LogParams),
    };
  }

  log(route = "unknown") {
    guildLogger[this.params.logLevel](this.params.logMessage, {
      error: this,
      ...this.params.logParams,
      route,
      ...(!!this.params.logParams?.error &&
      this.params.logParams.error instanceof AxiosError
        ? {
            axiosError: {
              responseBody: this.params.logParams.error.response?.data,
              responseHeaders: this.params.logParams.error.response?.headers,
              responseStatus: this.params.logParams.error.response?.status,
            },
          }
        : {}),
    });
  }
}
