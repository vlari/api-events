"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoDataError = exports.NotFoundError = exports.BadRequestError = exports.InternalError = exports.AuthFailureError = exports.ApiError = void 0;
const env_1 = __importDefault(require("../../config/env"));
const ApiResponse_1 = require("./ApiResponse");
var ErrorType;
(function (ErrorType) {
    ErrorType["Bad_Token"] = "BadTokenError";
    ErrorType["Unauthorized"] = "AuthFailureError";
    ErrorType["Access_token"] = "AccessTokenError";
    ErrorType["Internal"] = "InternalError";
    ErrorType["Not_Found"] = "NotFoundError";
    ErrorType["No_Data"] = "NoDataError";
    ErrorType["Bad_Request"] = "BadRequestError";
})(ErrorType || (ErrorType = {}));
class ApiError extends Error {
    constructor(type, message = 'error') {
        super(type);
        this.type = type;
        this.message = message;
    }
    static handle(error, res) {
        switch (error.type) {
            case ErrorType.Bad_Token:
            case ErrorType.Unauthorized:
                return new ApiResponse_1.AuthFailureResponse(error.message).send(res);
            case ErrorType.Internal:
                return new ApiResponse_1.InternalErrorResponse(error.message).send(res);
            case ErrorType.No_Data:
            case ErrorType.Not_Found:
                return new ApiResponse_1.NotFoundResponse(error.message).send(res);
            case ErrorType.Bad_Request:
                return new ApiResponse_1.BadRequestResponse(error.message).send(res);
            default:
                let message = error.message;
                if (env_1.default.NODE_ENV === 'production')
                    message = 'Something wrong happened';
                return new ApiResponse_1.InternalErrorResponse(message).send(res);
        }
    }
}
exports.ApiError = ApiError;
class AuthFailureError extends ApiError {
    constructor(message = 'Invalid Credentials') {
        super(ErrorType.Unauthorized, message);
    }
}
exports.AuthFailureError = AuthFailureError;
class InternalError extends ApiError {
    constructor(message = 'Internal Error') {
        super(ErrorType.Internal, message);
    }
}
exports.InternalError = InternalError;
class BadRequestError extends ApiError {
    constructor(message = 'Bad Request') {
        super(ErrorType.Bad_Request, message);
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends ApiError {
    constructor(message = 'Not') {
        super(ErrorType.Bad_Request, message);
    }
}
exports.NotFoundError = NotFoundError;
class NoDataError extends ApiError {
    constructor(message = 'No data') {
        super(ErrorType.No_Data, message);
    }
}
exports.NoDataError = NoDataError;
