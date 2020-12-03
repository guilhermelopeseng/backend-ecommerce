import { Router } from 'express';

import AuthenticateOwnerService from '../services/AuthenticatesService/AuthenticateOwnerService';

const sessionsOwnerRouter = Router();

interface Request {
  email: string;
  password?: string;
}

sessionsOwnerRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateOwner = new AuthenticateOwnerService();

  const { owner, token } = await authenticateOwner.execute({ email, password });

  const ownerNotPassword: Request = owner;

  delete ownerNotPassword.password;

  return response.json({ owner: ownerNotPassword, token });
});

export default sessionsOwnerRouter;
