import { getRepository } from 'typeorm';
import Product from '../../models/Product';
import Category from '../../models/Category';
import CreateCategoryService from '../CategoryService/CreateCategoryService';

interface Request {
  category_name: string;
  name: string;
  value: number;
  quantites: number;
  description: string;
}

class CreateProductService {
  public async execute({
    category_name,
    name,
    value,
    quantites,
    description,
  }: Request): Promise<Product> {
    const productsRepository = getRepository(Product);
    const categoriesRepository = getRepository(Category);

    const checkCategoryExist = await categoriesRepository.findOne({
      where: { name: category_name },
    });

    if (!checkCategoryExist) {
      const createCategory = new CreateCategoryService();

      const category = await createCategory.execute({
        name: category_name,
      });
      const product = productsRepository.create({
        category_id: category.id,
        name,
        value,
        quantites,
        description,
      });
      await productsRepository.save(product);
      return product;
    }
    const product = productsRepository.create({
      category_id: checkCategoryExist.id,
      name,
      value,
      quantites,
      description,
    });

    await productsRepository.save(product);
    return product;
  }
}

export default CreateProductService;
