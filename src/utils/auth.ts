import { Request, Response, NextFunction } from 'express';
import auth from 'jsonwebtoken';
import { IAdminMongoose } from '../types/types.js';
import { config } from 'dotenv';
import ApiError from '../errors/apiError.js';

config();

export const generateAdminToken = (user: Partial<IAdminMongoose>) => {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    throw new ApiError('JWT_SECRET_KEY no esta definida', 500);
  }

  const payload = {
    id: user._id,
    email: user.email,
  };
  try {
    return auth.sign(payload, secret, { expiresIn: '1000h' });
  } catch (error) {
    throw new ApiError(
      `Error generando Token -> ${(error as Error).message}`,
      500
    );
  }
};

export const verifyAdminToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    throw new ApiError('JWT_SECRET_KEY no esta definida', 500);
  }

  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    throw new ApiError('Token Required', 401);
  }

  try {
    const decoded = auth.verify(token, secret);
    res.locals.user = decoded;
    next();
  } catch (error) {
    throw new ApiError(`Token invalido -> ${error}`, 401);
  }
};
