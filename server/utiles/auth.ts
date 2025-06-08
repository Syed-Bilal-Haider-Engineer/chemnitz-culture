import { IUserData } from '@/src/type/user.type';
import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const getToken = (data: IUserData): string => {
  const secret = process.env.TOKEN_SECRET;
  const expiresIn = process.env.TOKEN_EXPIRATION;

  if (!secret) throw new Error('TOKEN_SECRET is not defined');
  if (!expiresIn) throw new Error('TOKEN_EXPIRATION is not defined');

  return jwt.sign({ ...data }, secret as string, { expiresIn } as SignOptions);
};

export const checkPassword = async (saved: string, provided: string) =>
  await bcrypt.compare(saved, provided);

export const getPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
