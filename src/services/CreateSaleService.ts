import { getRepository } from 'typeorm';

import Product from '../models/Product';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  quantites: number;
}
class CreateSaleService {
  public async execute({ id, quantites }: Request): Promise<Product> {
    const productsRepositoy = getRepository(Product);

    const product = await productsRepositoy.findOne({ where: { id } });

    if (!product) {
      throw new AppError('This Product does not exists');
    }

    const quantitesInicial = product.quantites;

    const resultOfSale = quantitesInicial - quantites;

    if (resultOfSale < 0) {
      throw new AppError('This quantites is not permissible');
    }

    await productsRepositoy.update({ id }, { quantites: resultOfSale });

    const productUpdated = await productsRepositoy.findOne({ where: { id } });

    if (!productUpdated) {
      throw new AppError('This Sale is not effectuation');
    }

    return productUpdated;
  }
}

export default CreateSaleService;
