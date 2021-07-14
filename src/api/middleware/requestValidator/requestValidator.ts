import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../core/ApiError';

export enum ValidationSource {
    BODY = 'body',
    HEADER = 'headers',
    QUERY = 'query',
    PARAM = 'params',
  }

export default (schema: Joi.ObjectSchema, source: ValidationSource = ValidationSource.BODY) => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  const validationResult = schema.validate(req[source]);

  if (!validationResult.error) return next();

  try {
    const message = validationResult.error.details[0].message;
    next(new BadRequestError(message));
  } catch {
    next();
  }
};
