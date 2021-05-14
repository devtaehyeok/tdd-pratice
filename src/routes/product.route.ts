import express from 'express';
import { ProductController } from '../controller';

const productRoutes = express.Router();
productRoutes.post('/', ProductController.createProduct);
export { productRoutes };
