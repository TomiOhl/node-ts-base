import { Router } from "express";
import helloRoutes from "./routes/hello.js";

const router = Router();

router.use("/api", router);

helloRoutes(router);

export default router;
