import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import createError, { HttpError } from 'http-errors';

export const authenticate = (headerToken?: string) => {
  if (!headerToken) {
    throw createError(StatusCodes.UNAUTHORIZED, 'No token provided');
  }
  const token = headerToken?.replace('Bearer ', '');
  const JWT_SECRET = process.env.JWT_SECRET || '';
  console.log(JWT_SECRET,"=JWT_SECRET=",token)
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw createError(StatusCodes.UNAUTHORIZED, 'Invalid or expired token');
  }
};

export const throwError = (
  status: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR,
  message?: string
): HttpError => (message ? createError(status, message) : createError(status))

