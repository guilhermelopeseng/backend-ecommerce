import { Router } from 'express';
import { getRepository } from 'typeorm';
import Cart from '../models/Cart';

import CreateCartService from '../services/CreateCartService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import AppError from '../errors/AppError';

const cartsRouter = Router();

cartsRouter.use(ensureAuthenticated);

cartsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const cartsRepository = getRepository(Cart);

  const carts = await cartsRepository.find({ where: { user_id: id } });

  if (carts.length === 0) {
    throw new AppError('This user not exist or no have carts');
  }

  return response.json(carts);
});

cartsRouter.post('/', async (request, response) => {
  const { user_id, product_id, quantites, descont, state } = request.body;

  const createCart = new CreateCartService();

  const cart = await createCart.execute({
    user_id,
    product_id,
    quantites,
    descont,
    state,
  });

  return response.json(cart);
});

export default cartsRouter;
