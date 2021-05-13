import { BeAnObject, ReturnModelType } from '@typegoose/typegoose/lib/types';
import express from 'express';
import { Product, ProductClass } from '../models';
export class ProductController {
  constructor(private productRepositorty: ReturnModelType<any, BeAnObject>) {}

  public async createProduct(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction | null
  ) {
    try {
      const createdProduct = (await new this.productRepositorty.create(
        req.body
      )) as ProductClass;
      return res.status(201).json(createdProduct);
    } catch (error) {
      next && next(error);
    }
  }
}

export const productController = new ProductController(Product);
