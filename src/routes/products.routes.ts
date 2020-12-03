import { Router } from 'express';
import { getRepository } from 'typeorm';

import Product from '../models/Product';

import CreateProductService from '../services/ProductService/CreateProductService';
import DeleteProductService from '../services/ProductService/DeleteProductService';
import UpdateProductService from '../services/ProductService/UpdateProductService';

import ensureOwnerAuthenticated from '../middlewares/ensureOwnerAuthenticated';

const productsRouter = Router();

productsRouter.use(ensureOwnerAuthenticated);

productsRouter.get('/', async (request, response) => {
  const productsRepository = getRepository(Product);

  const products = await productsRepository.find();

  return response.json(products);
});

productsRouter.post('/', async (request, response) => {
  const { category_name, name, value, quantites, description } = request.body;

  const productCreate = new CreateProductService();

  const product = await productCreate.execute({
    category_name,
    name,
    value,
    description,
    quantites,
  });

  return response.json(product);
});

productsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteProduct = new DeleteProductService();

  await deleteProduct.execute({ id });

  return response.status(200).json();
});

productsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { category_name, name, value, quantites, description } = request.body;

  const updateProduct = new UpdateProductService();

  const product = await updateProduct.execute({
    id,
    category_name,
    name,
    value,
    description,
    quantites,
  });

  return response.json(product);
});

export default productsRouter;
