const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
import { AuthFailureError, InternalError } from '../core/ApiError';

export const getAccessToken = (authorization?: string) => {
  if (!authorization) throw new AuthFailureError('Invalid Authorization');
  if (!authorization.startsWith('Bearer '))
    throw new AuthFailureError('Invalid Authorization');
  return authorization.split(' ')[1];
};

export const getHashedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const isValidPassword = async (password: string, accountPassword: string) => {
  const isValid = await bcrypt.compare(password, accountPassword);

  return isValid;
};

export const getSignedToken = (payload: object, privateKey: string) => {
  const token = jwt.sign(payload, privateKey, { expiresIn: '1h' });
  return token;
};
