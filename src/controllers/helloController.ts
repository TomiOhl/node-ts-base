import type { Request, Response } from "express";
import { handleError } from "../utils/errors.js";

export const hello = (req: Request, res: Response): void => {
  try {
    const name = req.query.name?.toString() || "friend";
    res.status(200).json({
      message: `Hello ${name}`,
    });
  } catch (error) {
    handleError("Failed to process hello request", error, res);
  }
};
