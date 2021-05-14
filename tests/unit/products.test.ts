import * as httpMocks from 'node-mocks-http';
import { ProductController } from '../../src/controller/product.controller';
import { ProductModel } from '../../src/models';
import newProduct from '../data/new-product.json';
/** we assume that mongodb part will be go well... */
ProductModel.create = jest.fn();

let req = httpMocks.createRequest();
let res = httpMocks.createResponse();
let next: any;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});
describe('Product Controller Create', () => {
  beforeEach(() => {
    req.body = newProduct;
  });
  test('should have a createProduct Function', () => {
    expect(typeof ProductController.createProduct).toBe('function');
  });
  test('should call Product.create with express', async () => {
    await ProductController.createProduct(req, res, next);
    expect(ProductModel.create).toBeCalledWith(newProduct);
  });
  test('should return 201 response code', async () => {
    await ProductController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  test('should return new Product json data', async () => {
    ProductModel.create = jest.fn().mockReturnValue(newProduct);
    await ProductController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });
  test('should handle error', async () => {
    const errorMessage = { message: 'description property missing' };
    const rejectedPromise = Promise.reject(errorMessage);
    ProductModel.create = jest.fn().mockReturnValue(rejectedPromise);
    await ProductController.createProduct(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
