import { productController } from '../../src/controller/product.controller';

describe('Product Controller Create', () => {
  test('shoud have a createProduct Function', () => {
    expect(typeof productController.createProduct).toBe('function');
  });
});
