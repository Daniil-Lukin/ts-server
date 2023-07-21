import { NextFunction, Response, Request } from "express";
import tokenService from "../services/token-service";
import { ResponseError } from "./errorHandler.middleware";

function jwtCheck(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(" ")[1];
      const verificationResults = tokenService.verify(
        token,
        String(process.env.JWT_ACCESS)
      );
      if (verificationResults) {
        console.log(verificationResults);
        next();
      } else {
        throw new ResponseError(401, `Invalid Token: ${verificationResults}`);
      }
    } else {
      throw new ResponseError(401, `Authorization header was not provided`);
    }
  } catch (e) {
    next(e);
  }
}

export default jwtCheck;
