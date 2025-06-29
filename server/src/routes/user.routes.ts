import { Router } from 'express';
import createUser, { getUserProfile, updateUser } from '../api/user/user.controller';
import { middleware } from '../../middleware/middleware';
/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - lat
 *               - lng
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               lat:
 *                 type: number
 *               lng:
 *                 type: number
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Email already exists
 */

const router = Router();
router.post('/signup', createUser);
router.put('/updateUser',middleware, updateUser);
router.get('/getUserProfileDetails',middleware,getUserProfile)
export default router;
