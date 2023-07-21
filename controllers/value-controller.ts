import { NextFunction, Request, Response } from "express";
import valueService from "../services/value-service";
import { ValueResponse } from "../interfaces/value-interfaces";

class ValueController {
  public async getAllValues(req: Request, res: Response, next: NextFunction) {
    try {
      const data: ValueResponse[] = await valueService.getAllValues();
      return res.status(200).json(data);
    } catch (e) {
      next(e);
      return null;
    }
  }

  public async getOneValue(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data: ValueResponse = await valueService.getOneValue(id);
      return res.status(200).json(data);
    } catch (e: any) {
      next(e);
      return null;
    }
  }

  public async deleteValue(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data: ValueResponse = await valueService.deleteValue(id);
      return res.status(200).json(data);
    } catch (e) {
      next(e);
      return null;
    }
  }
  public async createValue(req: Request, res: Response, next: NextFunction) {
    try {
      const newValue = req.body.value;
      const data: ValueResponse = await valueService.createValue(newValue);
      return res.status(200).json(data);
    } catch (e) {
      next(e);
      return null;
    }
  }

  public async changeValue(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const newValue = req.body.value;
      const data: ValueResponse = await valueService.changeValue(id, newValue);
      return res.status(200).json(data);
    } catch (e) {
      next(e);
      return null;
    }
  }
}
const valueController = new ValueController();
export default valueController;
