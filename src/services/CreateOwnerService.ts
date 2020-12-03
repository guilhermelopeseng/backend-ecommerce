import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';
import Owner from '../models/Owner';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<Owner> {
    const ownerRepository = getRepository(Owner);

    const checkOwnerExists = await ownerRepository.findOne({
      where: { email },
    });

    if (checkOwnerExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const owner = ownerRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await ownerRepository.save(owner);

    return owner;
  }
}

export default CreateUserService;
