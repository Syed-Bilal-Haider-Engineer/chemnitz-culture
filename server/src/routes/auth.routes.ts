import { Router } from 'express';
import login from '../controllers/auth/auth.controller';
import validateRequest from '../middleware/validateRequest';
import { loginSchema } from '../validation/authSchemas';

const authRouters = Router();
authRouters.post('/login',validateRequest(loginSchema), login);
export default authRouters;