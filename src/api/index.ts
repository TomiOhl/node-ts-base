import { Router } from "express";
import helloRoutes from "./routes/hello.js";

const router = Router();

router.use("/api/hello", helloRoutes);

export default router;
