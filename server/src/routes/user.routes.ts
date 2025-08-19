import { Router } from 'express';
import createUser, { getUserProfile, updateUser } from '../controllers/user/user.controller';
import { middleware } from '../middleware/middleware';
import { validateBody } from '../middleware/validateRequest';
import { addUserSchema, updateUserSchema } from '../validation/userSchemas';

const router = Router();
router.post('/signup', validateBody(addUserSchema), createUser);
router.put('/updateUser', validateBody(updateUserSchema), middleware, updateUser);
router.get('/getUserProfileDetails', middleware, getUserProfile);
export default router;