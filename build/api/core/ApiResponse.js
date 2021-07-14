"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenErrorResponse = exports.SuccessResponse = exports.SuccessMessageResponse = exports.InternalErrorResponse = exports.BadRequestResponse = exports.NotFoundResponse = exports.AuthFailureResponse = void 0;
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["SUCCES"] = 200] = "SUCCES";
    ResponseStatus[ResponseStatus["BADREQUEST"] = 400] = "BADREQUEST";
    ResponseStatus[ResponseStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ResponseStatus[ResponseStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    ResponseStatus[ResponseStatus["NOTFOUND"] = 404] = "NOTFOUND";
    ResponseStatus[ResponseStatus["INTERNALSERVER"] = 500] = "INTERNALSERVER";
})(ResponseStatus || (ResponseStatus = {}));
class ApiResponse {
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
    prepare(res, response) {
        return res.status(this.statusCode).json(ApiResponse.sanitize(response));
    }
    send(res) {
        return this.prepare(res, this);
    }
    static sanitize(response) {
        const objectTemplate = {};
        Object.assign(objectTemplate, response);
        // @ts-ignore
        delete objectTemplate.statusCode;
        for (const g in objectTemplate)
            if (typeof objectTemplate[g] === 'undefined')
                delete objectTemplate[g];
        return objectTemplate;
    }
}
class AuthFailureResponse extends ApiResponse {
    constructor(message = 'Failed Authentication') {
        super(ResponseStatus.UNAUTHORIZED, message);
    }
}
exports.AuthFailureResponse = AuthFailureResponse;
class NotFoundResponse extends ApiResponse {
    constructor(message = 'Not Found') {
        super(ResponseStatus.NOTFOUND, message);
    }
    send(res) {
        var _a;
        this.url = (_a = res.req) === null || _a === void 0 ? void 0 : _a.originalUrl;
        return super.prepare(res, this);
    }
}
exports.NotFoundResponse = NotFoundResponse;
class BadRequestResponse extends ApiResponse {
    constructor(message = 'Bad Request') {
        super(ResponseStatus.BADREQUEST, message);
    }
}
exports.BadRequestResponse = BadRequestResponse;
class InternalErrorResponse extends ApiResponse {
    constructor(message = 'Internal Error') {
        super(ResponseStatus.INTERNALSERVER, message);
    }
}
exports.InternalErrorResponse = InternalErrorResponse;
class SuccessMessageResponse extends ApiResponse {
    constructor(message) {
        super(ResponseStatus.SUCCES, message);
    }
}
exports.SuccessMessageResponse = SuccessMessageResponse;
class SuccessResponse extends ApiResponse {
    constructor(message, data) {
        super(ResponseStatus.SUCCES, message);
        this.data = data;
    }
    send(res) {
        return super.prepare(res, this);
    }
}
exports.SuccessResponse = SuccessResponse;
class AccessTokenErrorResponse extends ApiResponse {
    constructor(message = 'Invalid access token') {
        super(ResponseStatus.UNAUTHORIZED, message);
    }
    send(res) {
        return super.prepare(res, this);
    }
}
exports.AccessTokenErrorResponse = AccessTokenErrorResponse;
