import jwt, { JwtPayload } from 'jsonwebtoken';
import UserDataService from '../../database/services/userDataService';
import { Types } from 'mongoose';
import venv from '../../config/env';
import asyncHandler from '../utils/asyncHandler';
import { getAccessToken } from '../utils/authUtil';
import { AuthFailureError, AccessTokenError } from '../core/ApiError';

const guard = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) throw new AuthFailureError('Invalid Authorization');
  let userToken = getAccessToken(req.headers.authorization);
  if (!userToken) throw new AuthFailureError('Invalid Authorization');

  try {
    const token = jwt.verify(userToken, venv.API_SECRET ?? '') as JwtPayload;
    const account = await UserDataService.findById(
      new Types.ObjectId(token.id)
    );

    if (!account) throw new AuthFailureError('Invalid User');
    req.user = account;

    return next();
  } catch (err) {
    throw new AccessTokenError(err.message);
  }
});

export default guard;
