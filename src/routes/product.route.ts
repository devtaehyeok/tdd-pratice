import express from 'express';

const productRoutes = express.Router();

productRoutes.get('/', (req, res) => {
  res.json('My Products');
});

export { productRoutes };
