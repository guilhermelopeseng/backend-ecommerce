import { Router } from 'express';
import { getRepository } from 'typeorm';
import Category from '../models/Category';

import CreateCategoryService from '../services/CreateCategoryService';
import DeleteCategoryService from '../services/DeleteCategoryService';
import UpdateCategoryService from '../services/UpdateCategoryService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const categoriesRouter = Router();

categoriesRouter.use(ensureAuthenticated);

categoriesRouter.get('/', async (request, response) => {
  const categoriesRepository = getRepository(Category);

  const categories = await categoriesRepository.find();
  response.json(categories);
});

categoriesRouter.post('/', async (request, response) => {
  const { name } = request.body;

  const createCategory = new CreateCategoryService();

  const category = await createCategory.execute({
    name,
  });

  return response.json(category);
});

categoriesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteCategory = new DeleteCategoryService();

  await deleteCategory.execute({ id });

  return response.status(200).json();
});

categoriesRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name } = request.body;

  const updateCategory = new UpdateCategoryService();

  const category = await updateCategory.execute({ id, name });

  return response.json(category);
});

export default categoriesRouter;
