import express from 'express';
import { ProductClass, ProductModel } from '../models';
export class ProductController {
  public static async createProduct(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction | null
  ) {
    try {
      const createdProduct = (await ProductModel.create(
        req.body
      )) as ProductClass;
      return res.status(201).json(createdProduct);
    } catch (error) {
      next && next(error);
    }
  }
}
