import { Router } from "express";
import * as helloController from "../../controllers/helloController.js";
import { handleControllerError } from "../../utils/errors.js";
import { useRouter } from "../../utils/index.js";

const router = Router();

export default (app: Router) => {
  useRouter(app, "/hello", router);

  router.get("/", handleControllerError(helloController.hello));
};
