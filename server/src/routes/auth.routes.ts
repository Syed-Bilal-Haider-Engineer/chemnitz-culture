import { Router } from 'express';
import login from '../controllers/auth/auth.controller';
import { validateBody } from '../middleware/validateRequest';
import { loginSchema } from '../validation/authSchemas';

const authRouters = Router();
authRouters.post('/login', validateBody(loginSchema), login);
export default authRouters;