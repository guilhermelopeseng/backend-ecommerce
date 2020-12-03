import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import authConfig from '../config/auth';
import Owner from '../models/Owner';

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureOwnerAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayLoad;

    request.user = {
      id: sub,
    };

    const ownersRepository = getRepository(Owner);

    const checkOwner = await ownersRepository.findOne({
      where: { id: request.user.id },
    });

    if (!checkOwner) {
      throw new AppError('This Users is not a Owner');
    }

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}
