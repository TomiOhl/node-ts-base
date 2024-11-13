import { Router } from "express";
import * as helloController from "../../controllers/helloController.js";

const router = Router();

router.get("/", helloController.hello);

export default router;
