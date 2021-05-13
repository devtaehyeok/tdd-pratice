import { BeAnObject, ReturnModelType } from '@typegoose/typegoose/lib/types';
import { Product } from '../models';

export class ProductController {
  constructor(private productRepositiory: ReturnModelType<any, BeAnObject>) {}

  createProduct() {}
}

export const productController = new ProductController(Product);
