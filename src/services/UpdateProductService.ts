import { getRepository } from 'typeorm';
import Product from '../models/Product';
import AppError from '../errors/AppError';
import Category from '../models/Category';

interface Request {
  id: string;
  category_name: string;
  name: string;
  value: number;
  quantites: number;
  description: string;
}
class UpdateProductService {
  public async execute({
    id,
    category_name,
    name,
    value,
    quantites,
    description,
  }: Request): Promise<Product> {
    const productsRepository = getRepository(Product);
    const categoriesRepository = getRepository(Category);

    const checkProductExists = await productsRepository.findOne({
      where: { id },
    });

    if (!checkProductExists) {
      throw new AppError('This Product does not Exist');
    }

    const checkCategoryExists = await categoriesRepository.findOne({
      where: { name: category_name },
    });

    if (!checkCategoryExists) {
      throw new AppError('This Category does not Exist');
    }

    await productsRepository.update(
      { id },
      {
        name,
        quantites,
        description,
        value,
        category_id: checkCategoryExists.id,
      }
    );

    const product = await productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new AppError('This product does not updated');
    }

    return product;
  }
}

export default UpdateProductService;
