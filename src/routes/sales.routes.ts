import { Router } from 'express';

import CreateSaleService from '../services/CreateSaleService';
import ensureOwnerAuthenticated from '../middlewares/ensureOwnerAuthenticated';

const salesRouter = Router();

salesRouter.use(ensureOwnerAuthenticated);

salesRouter.post('/:id', async (request, response) => {
  const { id } = request.params;
  const { quantites } = request.body;

  const createSale = new CreateSaleService();

  const product = await createSale.execute({
    id,
    quantites,
  });

  return response.json(product);
});

export default salesRouter;
