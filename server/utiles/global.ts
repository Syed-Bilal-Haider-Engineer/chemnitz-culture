import jwt from 'jsonwebtoken';

export const getUser = (headerToken?: string) => {
  if(!headerToken) return null;
  const token = headerToken?.replace('Bearer ', '')
  const secret = process.env.TOKEN_SECRET || ''

  try {
    return token ? jwt.verify(token, secret) : null
  } catch (err) {
    throw new Error('InvalidTokenError')
  }
}