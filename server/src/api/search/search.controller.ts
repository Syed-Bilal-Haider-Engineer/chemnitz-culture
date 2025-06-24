import { throwError } from '../../../utils/global';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
const search = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  const { searchKeyword } = req.query;
  console.log(searchKeyword,"searchKeyword")
  const { prisma } = res.locals;
  try {
    const schema = Joi.object({
      searchKeyword: Joi.string().min(2).required(),
    });

    const { error } = schema.validate({ searchKeyword });

    if (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.details[0].message,
      });
      return;
    }

    const allFeatures = await prisma.feature.findMany();
    // console.log("allFeatures",allFeatures)
    const results = allFeatures?.filter((feature: any) => {
      // console.log("feature==>",feature)
      const name = feature.properties?.name?.trim().toLowerCase();
      const alt = feature.properties?.alt_name?.trim().toLowerCase();
      const category = feature.category?.trim().toLowerCase();
      // console.log(category,"category");
      return (
        name?.includes((searchKeyword as string).trim().toLowerCase()) ||
        alt?.includes((searchKeyword as string).trim().toLowerCase()) ||
        category?.includes(
          (searchKeyword as string).trim().toLowerCase()
        )
      );
    });
  console.log(results,"results")
     res.status(StatusCodes.OK).json({
      results,
      len: results.length
    });
    return;
  } catch (error) {
    console.error('Error search category:', error);
      return next(
          throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internel Server error')
        );
  }
};

export default search;
