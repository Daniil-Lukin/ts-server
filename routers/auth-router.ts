import { Router } from "express";
import AuthController from "../controllers/auth-controller";
import jwtCheck from "../middleware/jwtCheck.middleware";
import { errorHandler } from "../middleware/errorHandler.middleware";

const router: Router = Router();

router.post("/login", AuthController.logIn, errorHandler);
router.post("/registration", AuthController.registration, errorHandler);
router.delete("/:id", jwtCheck, AuthController.delete, errorHandler);
router.post("/refresh", AuthController.refresh, jwtCheck, errorHandler);

export default router;
