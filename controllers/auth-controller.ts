import { ResponseError } from "../middleware/errorHandler.middleware";
import AuthService from "../services/auth-service";
import { NextFunction, Request, Response } from "express";

class AuthController {
  public async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as { email: string; password: string } | null;
      if (body) {
        const userData = await AuthService.registration(
          body.email,
          body.password
        );
        return res.status(200).json(userData);
      } else {
        throw new ResponseError(400, `body was not provided`);
      }
    } catch (err) {
      next(err);
      return null;
    }
  }

  public async logIn(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as { email: string; password: string } | null;
      if (body) {
        const userData = await AuthService.login(body.email, body.password);
        return res.status(200).json(userData);
      } else {
        throw new ResponseError(401, `Unauthorized user`);
      }
    } catch (e) {
      next(e);
      return null;
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if (id) {
        const deletedUserData = await AuthService.deleteUser(id);
        return res.status(200).json(deletedUserData);
      } else {
        throw new ResponseError(400, `ID was not provided`);
      }
    } catch (e) {
      next(e);
      return null;
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.body.email;
      if (email) {
        const data = await AuthService.refresh(email);
        return res.status(200).json(data);
      } else {
        throw new ResponseError(400, `email was not provided`);
      }
    } catch (e) {
      next(e);
      return null;
    }
  }
}

const authController = new AuthController();
export default authController;
