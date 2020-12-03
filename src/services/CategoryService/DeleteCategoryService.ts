import { getRepository } from 'typeorm';

import Category from '../../models/Category';
import Product from '../../models/Product';
import AppError from '../../errors/AppError';

interface Request {
  id: string;
}
class DeleteCategoryService {
  public async execute({ id }: Request): Promise<void> {
    const categoriesRepository = getRepository(Category);
    const productsRepository = getRepository(Product);

    const checkCategoryExists = await categoriesRepository.findOne({
      where: { id },
    });

    if (!checkCategoryExists) {
      throw new AppError('This cateogry does not exists');
    }

    const checkProductExistsInCategory = await productsRepository.findOne({
      where: { category_id: id },
    });

    if (checkProductExistsInCategory) {
      throw new AppError(
        'This category have products, delete this product before delete category'
      );
    }

    await categoriesRepository.remove(checkCategoryExists);
  }
}

export default DeleteCategoryService;
