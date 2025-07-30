
import { authenticate } from "../middleware/global";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const authenticateRouter = Router();
authenticateRouter.get('/authenticate', (req: any, res: any) => {
  try {
    const isVerification:any = authenticate(req.headers?.authorization);
    return res.status(StatusCodes.OK).json({ 
      success: true,
      id: isVerification?.id,
    });
  } catch (error: any) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ 
      success: false, 
      message: error.message 
    });
  }
});


export default authenticateRouter;