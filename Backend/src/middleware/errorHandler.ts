import { NextFunction, Request, Response } from "express";

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(400).send({ success: false, message: error.message });
};

export default errorHandler;
