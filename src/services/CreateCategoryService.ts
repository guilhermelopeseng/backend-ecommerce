import { getRepository } from 'typeorm';
import Category from '../models/Category';
import AppError from '../errors/AppError';

interface Request {
  name: string;
}
class CreateCategoryService {
  public async execute({ name }: Request): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    const checkCategoryExists = await categoriesRepository.findOne({
      where: { name },
    });

    if (checkCategoryExists) {
      throw new AppError('This Category Exist!');
    }
    const category = categoriesRepository.create({
      name,
    });

    await categoriesRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
