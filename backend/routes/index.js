import { Router } from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/user', authMiddleware, userController.user);

export default router;
