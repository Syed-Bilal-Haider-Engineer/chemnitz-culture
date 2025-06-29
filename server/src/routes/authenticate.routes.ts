
import { authenticate } from "../../utils/global";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const authenticateRouter = Router();
authenticateRouter.get('/authenticate', (req: any, res: any) => {
  try {
    console.log("[BACKEND] Received auth request, headers:", req.headers);
    const isVerification:any = authenticate(req.headers?.authorization);
    console.log("[BACKEND] Token verification result:", isVerification);
    
    return res.status(StatusCodes.OK).json({ 
      success: true,
      id: isVerification?.id,
    });
  } catch (error: any) {
    console.error("[BACKEND] Authentication error:", error);
    return res.status(StatusCodes.UNAUTHORIZED).json({ 
      success: false, 
      message: error.message 
    });
  }
});


export default authenticateRouter;