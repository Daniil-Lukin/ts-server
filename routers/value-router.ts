import { Router } from "express";
import ValueController from "../controllers/value-controller";
import jwtCheck from "../middleware/jwtCheck.middleware";
import { errorHandler } from "../middleware/errorHandler.middleware";

const router: Router = Router();

router.post("/:id", jwtCheck, ValueController.changeValue, errorHandler);
router.post("/", jwtCheck, ValueController.createValue, errorHandler);
router.get("/", jwtCheck, ValueController.getAllValues, errorHandler);
router.delete("/:id", jwtCheck, ValueController.deleteValue, errorHandler);

export default router;
