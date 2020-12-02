import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Category from '../models/Category';

interface Request {
  id: string;
  name: string;
}
class UpdateProductService {
  public async execute({ id, name }: Request): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    const checkCategoryExists = await categoriesRepository.findOne({
      where: { id },
    });

    if (!checkCategoryExists) {
      throw new AppError('This category does not Exist');
    }

    await categoriesRepository.update(
      { id },
      {
        name,
      }
    );

    const category = await categoriesRepository.findOne({ where: { id } });

    if (!category) {
      throw new AppError('This product does not updated');
    }

    return category;
  }
}

export default UpdateProductService;
