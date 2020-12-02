import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

interface Request {
  name: string;
  email: string;
  password?: string;
}

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUser = new CreateUserService();

  const userPass = await createUser.execute({ name, email, password });

  const user: Request = userPass;

  delete user.password;

  return response.json(user);
});

export default usersRouter;
