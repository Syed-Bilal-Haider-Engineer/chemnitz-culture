import { Router } from 'express';
import createUser, { getUserProfile, updateUser } from '../controllers/user/user.controller';
import { middleware } from '../middleware/middleware';
import validateRequest from '../middleware/validateRequest';
import { addUserSchema, getUserProfileSchema, updateUserSchema } from '../validation/userSchemas';

const router = Router();
router.post('/signup', validateRequest(addUserSchema),createUser);
router.put('/updateUser',validateRequest(updateUserSchema),middleware, updateUser);
router.get('/getUserProfileDetails',validateRequest(getUserProfileSchema),middleware,getUserProfile)
export default router;
