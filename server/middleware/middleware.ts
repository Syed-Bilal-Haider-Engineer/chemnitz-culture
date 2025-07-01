import { authenticate } from "../utils/global";
import { NextFunction, Request, Response } from "express";

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  const user = authenticate(req.headers?.authorization);
  res.locals.user = user;
  next();
};