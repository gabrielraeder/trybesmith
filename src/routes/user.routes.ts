import { Router } from 'express';
import UserController from '../controllers/user.controller';
import userMiddleware from '../middlewares/user.middleware';

const router = Router();

const userController = new UserController();

router.post('/', userMiddleware, userController.create);

export default router;