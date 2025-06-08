import { Router } from 'express';
import createUser, { getUserProfile, updateUser } from './user.controller';

const router = Router();
router.post('/createUser', createUser);
router.put('/updateUser', updateUser);
router.get('/getUserProfileDetails',getUserProfile)
export default router;
