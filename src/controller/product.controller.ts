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
  /** return all Product Documents */
  public static async getProducts(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction | null
  ) {
    try {
      const allProducts = (await ProductModel.find({})) as ProductClass[];
      return res.status(200).json(allProducts);
    } catch (error) {
      next && next(error);
    }
  }
  public static async getProductById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction | null
  ) {
    try {
      const product = await ProductModel.findById(req.params.productId);
      if (product) {
        return res.status(200).json(product);
      }
      return res.status(404).send();
    } catch (error) {
      next && next(error);
    }
  }
  public static async updateProduct(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction | null
  ) {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        req.params.productId,
        req.body,
        { new: true }
      );
      if (updatedProduct) {
        return res.status(200).json(updatedProduct);
      }
      return res.status(404).send();
    } catch (error) {
      next && next(error);
    }
  }
  public static async deleteProduct(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction | null
  ) {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(
        req.params.productId
      );
      if (deletedProduct) {
        return res.status(200).json(deletedProduct);
      }
      return res.status(404).send();
    } catch (error) {
      next && next(error);
    }
  }
}
