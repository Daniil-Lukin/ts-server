import { NextFunction, Request, Response } from "express";

export class ResponseError extends Error {
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  status: number;
}

export const errorHandler = (
  err: ResponseError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(err.status || 500).json({ error: err.message });
};
