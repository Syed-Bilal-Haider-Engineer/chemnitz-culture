import { authenticate } from "../utils/global";
import { NextFunction, Request, Response } from "express";

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  const user = authenticate(req.headers?.authorization);
  console.log("user in authenticate:",user)
  res.locals.user = user;
  console.log('res.locals.user =>',res.locals.user )
  next();
};