import { Response } from 'express';
import venv from '../../config/env';
import {
    AuthFailureResponse,
    NotFoundResponse,
    BadRequestResponse,
    InternalErrorResponse
} from './ApiResponse';

enum ErrorType {
    Bad_Token = 'BadTokenError',
    Unauthorized = 'AuthFailureError',
    Access_token = 'AccessTokenError',
    Internal = 'InternalError',
    Not_Found = 'NotFoundError',
    No_Data = 'NoDataError',
    Bad_Request = 'BadRequestError'
}

export abstract class ApiError extends Error {
    constructor(public type: ErrorType, public message: string = 'error') {
        super(type);
    }

    public static handle(err: ApiError, res: Response): Response {
        switch (err.type) {
            case ErrorType.Bad_Token:
            case ErrorType.Unauthorized:
                return new AuthFailureResponse(err.message).send(res);
            case ErrorType.Internal:
                return new InternalErrorResponse(err.message).send(res);
            case ErrorType.No_Data:
            case ErrorType.Not_Found:
                return new NotFoundResponse(err.message).send(res);
            case ErrorType.Bad_Request:
                return new BadRequestResponse(err.message).send(res);
            default:
                let message = err.message;
                if (venv.NODE_ENV === 'production') message = 'Something wrong happened'
                return new InternalErrorResponse(message).send(res);
        }
    }
}

export class AuthFailureError extends ApiError {
    constructor(message = 'Invalid Credentials') {
        super(ErrorType.Unauthorized, message);
    }
}

export class InternalError extends ApiError {
    constructor(message = 'Internal Error') {
        super(ErrorType.Internal, message);
    }
}

export class BadRequestError extends ApiError {
    constructor(message = 'Bad Request') {
        super(ErrorType.Bad_Request, message);
    }
}

export class NotFoundError extends ApiError {
    constructor(message = 'Not Found') {
        super(ErrorType.Bad_Request, message);
    }
}

export class NoDataError extends ApiError {
    constructor(message = 'No data') {
        super(ErrorType.No_Data, message);
    }
}

export class AccessTokenError extends ApiError {
    constructor(message = 'Invalid access token') {
        super(ErrorType.Access_token, message);
    }
}
