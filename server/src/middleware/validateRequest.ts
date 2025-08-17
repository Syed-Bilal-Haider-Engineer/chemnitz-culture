import { Response,Request,NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const validateRequest = (schema:any) => (req: Request, res: Response, next: NextFunction) => {
     const { error } = schema.validate(req.body);

    if (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.details[0].message });
      return;
    }
}

export default validateRequest;