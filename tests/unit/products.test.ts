import * as httpMocks from 'node-mocks-http';
import { ProductController } from '../../src/controller/product.controller';
import { ProductModel } from '../../src/models';
import allProducts from '../data/all-products.json';
import newProduct from '../data/new-product.json';
/** we assume that mongodb part will be go well... */
ProductModel.create = jest.fn();
ProductModel.find = jest.fn();
ProductModel.findById = jest.fn();
let req = httpMocks.createRequest();
let res = httpMocks.createResponse();
let next: any;
const productID = '609e4472d724e3cc4d1d9759';
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

describe('product controller GET', () => {
  test('should have  a getProducts function', () => {
    expect(typeof ProductController.getProducts).toBe('function');
  });
  test('should call  ProductModel.find({})', async () => {
    await ProductController.getProducts(req, res, next);
    expect(ProductModel.find).toHaveBeenCalledWith({});
  });
  test('should return 200 response', async () => {
    await ProductController.getProducts(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled).toBeTruthy();
  });
  test('should return json body in response', async () => {
    ProductModel.find = jest.fn().mockReturnValue(allProducts);
    await ProductController.getProducts(req, res, next);
    expect(res._getJSONData()).toStrictEqual(allProducts);
  });
  test('should handle error', async () => {
    const errorMessage = { message: 'Error finding product data' };
    const rejectPromise = Promise.reject(errorMessage);
    (ProductModel.find as jest.Mock<any, any>).mockReturnValue(rejectPromise);
    await ProductController.getProducts(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe('product controller GetById', () => {
  test('should have  a getProductById function', () => {
    expect(typeof ProductController.getProductById).toBe('function');
  });
  test('should call productMode.findById', async () => {
    req.params.productId = productID;
    await ProductController.getProductById(req, res, next);
    expect(ProductModel.findById).toBeCalledWith(productID);
  });
  test('should return json body and response code 200', async () => {
    req.params.productId = productID;
    (ProductModel.findById as jest.Mock<any, any>).mockReturnValue(newProduct);
    await ProductController.getProductById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newProduct);
    expect(res._isEndCalled()).toBeTruthy();
  });
  test('should return 404 when item doesn"t exist', async () => {
    (ProductModel.findById as jest.Mock<any, any>).mockReturnValue(null);
    req.params.productId = productID;
    await ProductController.getProductById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
  test('should handle error', async () => {
    const errorMessage = { message: 'error' };
    const rejectPromise = Promise.reject(errorMessage);
    (ProductModel.findById as jest.Mock<any, any>).mockReturnValue(
      rejectPromise
    );
    await ProductController.getProductById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});
