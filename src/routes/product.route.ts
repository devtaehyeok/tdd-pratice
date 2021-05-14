import express from 'express';
import { ProductController } from '../controller';

const productRoutes = express.Router();
productRoutes.post('/', ProductController.createProduct);
productRoutes.get('/', ProductController.getProducts);
productRoutes.get('/:productId', ProductController.getProductById);
export { productRoutes };
