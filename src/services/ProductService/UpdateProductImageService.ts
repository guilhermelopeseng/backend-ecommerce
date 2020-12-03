import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Product from '../../models/Product';
import uploadConfig from '../../config/upload';
import AppError from '../../errors/AppError';

interface Request {
  id: string;
  imageFilename: string;
}
class UpdateProductImageService {
  public async execute({ id, imageFilename }: Request): Promise<Product> {
    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new AppError('This product does not exist');
    }

    if (product.image) {
      const productImageFilePath = path.join(
        uploadConfig.directory,
        product.image
      );
      const productImageFileExists = await fs.promises.stat(
        productImageFilePath
      );
      if (productImageFileExists) {
        await fs.promises.unlink(productImageFilePath);
      }
    }
    product.image = imageFilename;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductImageService;
