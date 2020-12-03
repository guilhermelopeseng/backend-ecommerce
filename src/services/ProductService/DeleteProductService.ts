import { getRepository } from 'typeorm';

import Product from '../../models/Product';
import AppError from '../../errors/AppError';

interface Request {
  id: string;
}
class DeleteProductService {
  public async execute({ id }: Request): Promise<void> {
    const productsRepository = getRepository(Product);

    const checkProductExists = await productsRepository.findOne({
      where: { id },
    });

    if (!checkProductExists) {
      throw new AppError('This product does not exists');
    }

    await productsRepository.remove(checkProductExists);
  }
}

export default DeleteProductService;
