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

routes.use('/category', categoriesRouter);
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/sales', salesRouter);
routes.use('/carts', cartsRouter);
routes.use('/owner', ownerRouter);
routes.use('/ownersessions', sessionsOwnerRouter);

export default routes;
