
import { Router } from 'express';
import createUser, { updateUser } from './user.controller';
import login from './login.controller';

const router = Router();
router.post('/createUser', createUser); 
router.post('/login',login);
router.put('/updateUser',updateUser)

export default router;
