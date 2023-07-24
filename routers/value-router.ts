import { Router } from "express";
import ValueController from "../controllers/value-controller";
import jwtCheck from "../middleware/jwtCheck.middleware";
import { errorHandler } from "../middleware/errorHandler.middleware";

const router: Router = Router();

router.put("/:id", jwtCheck, ValueController.changeValue, errorHandler);
router.post("", jwtCheck, ValueController.createValue, errorHandler);
router.get("/", jwtCheck, ValueController.getAllValues, errorHandler);
router.get("/:id", jwtCheck, ValueController.getOneValue, errorHandler);
router.delete("/:id", jwtCheck, ValueController.deleteValue, errorHandler);

export default router;
