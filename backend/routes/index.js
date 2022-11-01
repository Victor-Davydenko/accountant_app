import { Router } from 'express';
import userController from '../controllers/userController.js';
import documentController from '../controllers/documentController.js';
import authMiddleware from '../middleware/auth.js';

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.post('/add_contract', authMiddleware, documentController.addContract);
router.put('/update_contract/:id', authMiddleware, documentController.updateContract);
router.delete('/remove_contract/:id', authMiddleware, documentController.removeContract);
router.get('/get_contract/:id', authMiddleware, documentController.getContract);
router.post('/add_completedWorkAct', authMiddleware, documentController.addCompletedWorkAct);
router.put('/update_completedWorkAct/:id', authMiddleware, documentController.updateCompletedWorkAct);
router.delete('/remove_completedWorkAct/:id', authMiddleware, documentController.removeCompletedWorkAct);
router.get('/get_completedWorkAct/:id', authMiddleware, documentController.getCompletedWorkAct);
router.get('/all_documents', authMiddleware, documentController.getAllDocuments);
router.get('/user', authMiddleware, userController.user);

export default router;
