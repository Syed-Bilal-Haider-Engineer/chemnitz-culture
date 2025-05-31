// routes.ts
import { Router } from 'express';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import meusamAPI from './user.controller';

const router = Router();

router.get('/meusam', meusamAPI);

export default router;
