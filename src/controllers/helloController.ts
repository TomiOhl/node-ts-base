import type { Request, Response } from "express";

export const hello = async (req: Request, res: Response): Promise<void> => {
  const name = req.query.name?.toString() || "friend";
  res.status(200).json({
    message: `Hello ${name}`,
  });
};
