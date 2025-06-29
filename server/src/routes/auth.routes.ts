import { Router } from 'express';
import login from '../api/auth/auth.controller';

const authRouters = Router();
authRouters.post('/login', login);
export default authRouters;