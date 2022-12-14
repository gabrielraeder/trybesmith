import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import authValidate from '../middlewares/auth.middleware';
import orderMiddleware from '../middlewares/order.middleware';

const router = Router();

const orderController = new OrderController();

router.get('/', orderController.getAll);
router.post('/', authValidate, orderMiddleware, orderController.create);

export default router;