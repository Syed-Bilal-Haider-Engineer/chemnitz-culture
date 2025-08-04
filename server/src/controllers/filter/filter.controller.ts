import { filterService } from "../../services/filterService";
import { throwError } from "../../middleware/global";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const filter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const category = req.query.category as string | undefined;
  const { prisma } = res.locals;
  console.log("category==>",category);
  try {
    const result = await filterService(prisma, category);

    if (result.error) {
      return next(throwError(StatusCodes.BAD_REQUEST, result.error));
    }

    res.status(StatusCodes.ACCEPTED).json(result);
  } catch (error) {
    return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server error"));
  }
};

export default filter;
