import { Router } from 'express';

import CreateSaleService from '../services/CreateSaleService';
import ensureOwnerAuthenticated from '../middlewares/ensureOwnerAuthenticated';

const salesRouter = Router();

salesRouter.use(ensureOwnerAuthenticated);

salesRouter.post('/:id', async (request, response) => {
  // Esta rota atualiza as quantidades dos produtos que existem no estoque, só é chamada quando a comprar já for entregue para o cliente, o carrinho não tem influencia nos dados do banco somente essa
  // Ela é mais para facilitar a venda, não precisando ter que da um update no produto toda vez que for vendido
  // No front-end pode fazer uma condicional para quando o produto chegar na ultima etapa chamar essa rota
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
