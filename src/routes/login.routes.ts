import { Router } from 'express';
import UserController from '../controllers/user.controller';
import loginMiddleware from '../middlewares/login.middleware';

const router = Router();

const userController = new UserController();

router.post('/', loginMiddleware, userController.login);

export default router;