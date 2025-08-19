import { Response, Request, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema } from "joi";

interface ValidationOptions {
  body?: boolean;
  query?: boolean;
  params?: boolean;
}

const validateRequest = (schema: Schema, options: ValidationOptions = { body: true }) => 
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      let dataToValidate: any = {};
      
      if (options.body) {
        dataToValidate = { ...dataToValidate, ...req.body };
      }
      if (options.query) {
        dataToValidate = { ...dataToValidate, ...req.query };
      }
      if (options.params) {
        dataToValidate = { ...dataToValidate, ...req.params };
      }

      const { error } = schema.validate(dataToValidate, { 
        abortEarly: false,
        stripUnknown: true 
      });
     
      if (error) {
        console.log("error==>",error);
        const errorMessages = error.details.map(detail => detail.message);
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ 
            message: "Validation failed", 
            errors: errorMessages 
          });
        return;
      }

      next();
    } catch (err) {
      console.error('Validation middleware error:', err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal validation error" });
      return;
    }
  };

export const validateBody = (schema: Schema) => validateRequest(schema, { body: true });
export const validateQuery = (schema: Schema) => validateRequest(schema, { query: true });
export const validateParams = (schema: Schema) => validateRequest(schema, { params: true });
export const validateBodyAndQuery = (schema: Schema) => validateRequest(schema, { body: true, query: true });

export default validateRequest;