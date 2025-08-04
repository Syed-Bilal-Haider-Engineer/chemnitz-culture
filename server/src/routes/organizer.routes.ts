import { Router } from 'express';
import organizerAuthController from '../controllers/auth/organizerAuth.controller';
import { validateBody } from '../middleware/validateRequest';
import { organizerLoginSchema, organizerSignupSchema } from '../validation/organizerSchemas';
import { middleware } from '../middleware/middleware';

const router = Router();

router.post('/login', validateBody(organizerLoginSchema), organizerAuthController.organizerLogin);
router.post('/signup', validateBody(organizerSignupSchema), organizerAuthController.organizerSignup);
router.get('/profile', middleware, organizerAuthController.getOrganizerProfile);

export default router; 