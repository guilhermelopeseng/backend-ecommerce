import { Router } from 'express';

import CreateOwnerService from '../services/CreateOwnerService';

const ownerRouter = Router();

interface Request {
  name: string;
  email: string;
  password?: string;
}

ownerRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createOwner = new CreateOwnerService();

  const ownerPass = await createOwner.execute({ name, email, password });

  const owner: Request = ownerPass;

  delete owner.password;

  return response.json(owner);
});

export default ownerRouter;
