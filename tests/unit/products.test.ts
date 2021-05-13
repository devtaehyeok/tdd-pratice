import * as httpMocks from 'node-mocks-http';
import { productController } from '../../src/controller/product.controller';
import { Product } from '../../src/models';
import newProduct from '../data/new-product.json';
/** we assume that mongodb part will be go well... */
Product.create = jest.fn();

let req = httpMocks.createRequest();
let res = httpMocks.createResponse();
let next: null = null;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});
describe('Product Controller Create', () => {
  beforeEach(() => {
    req.body = newProduct;
  });
  test('should have a createProduct Function', () => {
    expect(typeof productController.createProduct).toBe('function');
  });
  test('should call Product.create with express', async () => {
    await productController.createProduct(req, res, next);
    expect(Product.create).toBeCalledWith(newProduct);
  });
  test('should return 201 response code', async () => {
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  test('should return new Product json data', async () => {
    Product.create = jest.fn().mockReturnValue(newProduct);
    await productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });
});
