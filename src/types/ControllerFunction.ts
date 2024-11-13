import type { Request, Response } from "express";

type ControllerFunction = (req: Request, res: Response) => Promise<void>;

export default ControllerFunction;
