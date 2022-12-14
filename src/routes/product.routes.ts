import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import productMiddleware from '../middlewares/product.middleware';

const router = Router();

const productController = new ProductController();

router.post('/', productMiddleware, productController.create);
router.get('/', productController.getAll);

export default router;