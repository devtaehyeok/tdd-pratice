import request from 'supertest';
import { app } from '../../server';
import { default as newProduct } from '../data/new-product.json';
jest.setTimeout(10000);

let firstProduct: any;
test('POST /api/products', async () => {
  const response = await request(app)
    .post('/api/products')
    .send({ ...newProduct });

  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newProduct.name);
  expect(response.body.description).toBe(newProduct.description);
});

test('POST /api/products should return 500 if params do not satisfy required condtion', async () => {
  const response = await request(app)
    .post('/api/products')
    .send({ ...newProduct, name: undefined });

  expect(response.statusCode).toBe(500);

  expect(response.body).toStrictEqual({
    message: 'ProductClass validation failed: name: Path `name` is required.',
  });
});

test('GET /api/products', async () => {
  const response = await request(app).get('/api/products');
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0]).toBeDefined();
  expect(response.body[0].description).toBeDefined();
  expect(response.body[0].name).toBeDefined();
  firstProduct = response.body[0];
});

/** we need to real ID in mongodb for integration  test*/
test('GET /api/products/:productId', async () => {
  const response = await request(app).get(`/api/products/${firstProduct._id}`);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstProduct.name);
  expect(response.body.description).toBe(firstProduct.description);
});

test('GET id doesnt exist /api/products/:productId', async () => {
  const response = await request(app).get(
    `/api/products/609e4472d724e3cc4d1d9758`
  );
  expect(response.statusCode).toBe(404);
  console.log(response.body);
});
