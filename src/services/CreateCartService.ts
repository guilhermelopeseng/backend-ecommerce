import { getRepository } from 'typeorm';

import Product from '../models/Product';
import AppError from '../errors/AppError';
import Cart from '../models/Cart';
import User from '../models/Users';

interface Request {
  user_id: string;
  product_id: string;
  quantites: number;
  descont: number;
}

class CreateCartService {
  public async execute({
    user_id,
    product_id,
    quantites,
    descont,
  }: Request): Promise<Cart> {
    const cartsRepository = getRepository(Cart);
    const productsRepository = getRepository(Product);
    const usersRepository = getRepository(User);

    const checkProductExist = await productsRepository.findOne({
      where: { id: product_id },
    });
    const checkUserExist = await usersRepository.findOne({
      where: { id: user_id },
    });

    if (!checkProductExist || !checkUserExist) {
      throw new AppError('Product/User does not Exist');
    }

    if (quantites > checkProductExist.quantites) {
      throw new AppError('This quantites is not permissible');
    }

    const checkCartExist = await cartsRepository.findOne({
      where: { product_id },
    });

    if (checkCartExist) {
      if (checkCartExist.quantites + quantites > checkProductExist.quantites) {
        throw new AppError('This quantities is not permissible');
      }
      await cartsRepository.update(
        { id: checkCartExist.id },
        { quantites: quantites + checkCartExist.quantites }
      );

      const cart = await cartsRepository.findOne({
        where: { id: checkCartExist.id },
      });

      if (!cart) {
        throw new AppError('This updated not sucess');
      }
      return cart;
    }

    const cart = cartsRepository.create({
      user_id,
      product_id,
      quantites,
      state: 'Selected',
      descont,
    });

    await cartsRepository.save(cart);

    return cart;
  }
}

export default CreateCartService;
