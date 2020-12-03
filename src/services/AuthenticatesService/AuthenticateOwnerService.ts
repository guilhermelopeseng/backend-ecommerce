import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../../errors/AppError';
import authConfig from '../../config/auth';
import Owner from '../../models/Owner';

interface Request {
  email: string;
  password: string;
}
class AuthenticateOwnerService {
  public async execute({
    email,
    password,
  }: Request): Promise<{ owner: Owner; token: string }> {
    const ownersRepository = getRepository(Owner);

    const owner = await ownersRepository.findOne({ where: { email } });

    if (!owner) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await compare(password, owner.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, { subject: owner.id, expiresIn });

    return { owner, token };
  }
}

export default AuthenticateOwnerService;
