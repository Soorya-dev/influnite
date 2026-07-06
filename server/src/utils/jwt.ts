import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { env as ENV } from '../config/env';

type Role = 'admin' | 'brand' | 'influencer';

export interface JwtPayloadData {
  id: string;
  role: Role;
}

export const generateAccessToken = (id: string, role: Role) => {
  const options: SignOptions = { expiresIn: ENV.JWT_ACCESS_EXPIRES_IN as SignOptions['expiresIn'] };
  return jwt.sign({ id, role }, ENV.JWT_ACCESS_SECRET as Secret, options);
};

export const generateRefreshToken = (id: string, role: Role) => {
  const options: SignOptions = { expiresIn: ENV.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn'] };
  return jwt.sign({ id, role }, ENV.JWT_REFRESH_SECRET as Secret, options);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ENV.JWT_ACCESS_SECRET as Secret) as JwtPayloadData;
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, ENV.JWT_REFRESH_SECRET as Secret) as JwtPayloadData;
};
