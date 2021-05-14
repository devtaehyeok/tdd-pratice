import express from 'express';
import { ProductController } from '../controller';

const productRoutes = express.Router();
productRoutes.post('/', ProductController.createProduct);
productRoutes.get('/', ProductController.getProducts);
productRoutes.get('/:productId', ProductController.getProductById);
productRoutes.put('/:productId', ProductController.updateProduct);
productRoutes.delete('/:productId', ProductController.deleteProduct);
export { productRoutes };
