import { Request, Response, NextFunction } from "express-serve-static-core";
import CustomError from "../model/errors";

export default function handleError(
  error: CustomError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = error.status || 400;
  const message = error.message || "Something went wrong";

  console.log(`Error ${status} - ${message}`);
  return response.status(status).send({
    status,
    message,
  });
}
