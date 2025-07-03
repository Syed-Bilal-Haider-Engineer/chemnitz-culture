import { Router } from 'express';
import createUser, { getUserProfile, updateUser } from '../api/user/user.controller';
import { middleware } from '../../middleware/middleware';
const router = Router();
router.post('/signup', createUser);
router.put('/updateUser',middleware, updateUser);
router.get('/getUserProfileDetails',middleware,getUserProfile)
export default router;
