import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import createError, { HttpError } from 'http-errors'
export const getUser = (headerToken?: string) => {
  if(!headerToken) return null;
  const token = headerToken?.replace('Bearer ', '')
  const JWT_SECRET = process.env.JWT_SECRET || ''

  try {
    return token ? jwt.verify(token, JWT_SECRET) : null
  } catch (err) {
    throw new Error('InvalidTokenError')
  }
}

export const throwError = (
  status: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR,
  message?: string
): HttpError => (message ? createError(status, message) : createError(status))
