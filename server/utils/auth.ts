import { IUserData } from '@/src/type/user.type';
import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const getToken = (data: IUserData) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.TOKEN_EXPIRATION;
//  console.log(secret,"secret",expiresIn);
 
  if (!secret) throw new Error('TOKEN_SECRET is not defined');
  if (!expiresIn) throw new Error('TOKEN_EXPIRATION is not defined');
  //  console.log(secret,"secret",expiresIn);
   
  return  jwt.sign({ ...data }, secret as string, { expiresIn } as SignOptions);
};

export const checkPassword = async (saved: string, provided: string) =>
  await bcrypt.compare(saved, provided);

export const getPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
