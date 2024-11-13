import axios from "axios";
import type { Response } from "express";
import guildLogger from "./logger.js";

class ErrorWithCode extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

const handleError = (message: string, error: any, res: Response): void => {
  const processedError =
    axios.isAxiosError(error) && error?.response?.data
      ? error.response.data
      : error instanceof Error
        ? error.message
        : error;
  res.status(error instanceof ErrorWithCode ? error.code : 500).json({
    message,
    error: processedError,
  });
  guildLogger.error(message, processedError);
};

export { ErrorWithCode, handleError };
