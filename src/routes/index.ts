import { Router } from 'express';

import categoriesRouter from './categories.routes';
import productsRouter from './products.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import salesRouter from './sales.routes';
import cartsRouter from './carts.routes';
import ownerRouter from './owner.routes';
import sessionsOwnerRouter from './sessionsOwner.routes';

const routes = Router();

routes.use('/category', categoriesRouter); // rota para criação, delete, atualização das categorias
routes.use('/products', productsRouter); // rota para criação, delete, autualização dos produtos
routes.use('/users', usersRouter); // rota para criação dos usuários
routes.use('/sessions', sessionsRouter); // rota para autenticação dos usuários
routes.use('/sales', salesRouter); // rota para efetuar uma venda
routes.use('/carts', cartsRouter); // rota para o carrinho, contendo o usuário e o id do produto com as quantidades devidas
routes.use('/owner', ownerRouter); // rota para criação de um proprietário
routes.use('/ownersessions', sessionsOwnerRouter); // rota para atuenticar esse proprietário

export default routes;
