import { Response } from 'express';

enum ResponseStatus {
    SUCCES = 200,
    BADREQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOTFOUND = 404,
    INTERNALSERVER = 500
}

abstract class ApiResponse {
    constructor(
        protected statusCode: ResponseStatus,
        protected messaage: string
    ) {}

    protected prepare<T extends ApiResponse>(res: Response, response: T): Response {
        return res.status(this.statusCode).json(ApiResponse.sanitize(response));
    }

    public send(res: Response): Response {
        return this.prepare<ApiResponse>(res, this);
    }

    private static sanitize<T extends ApiResponse>(response: T): T {
        const objectTemplate: T = {} as T;
        Object.assign(objectTemplate, response);
        // @ts-ignore
        delete objectTemplate.statusCode;
        for (const g in objectTemplate) if (typeof objectTemplate[g] === 'undefined') delete objectTemplate[g];
        return objectTemplate;
    }
}

export class AuthFailureResponse extends ApiResponse {
    constructor(message = 'Failed Authentication') {
        super(ResponseStatus.UNAUTHORIZED, message);
    }
}

export class NotFoundResponse extends ApiResponse {
    private url: string | undefined;

    constructor(message = 'Not Found') {
        super(ResponseStatus.NOTFOUND, message);
    }

    send(res: Response): Response {
        this.url = res.req?.originalUrl;
        return super.prepare<NotFoundResponse>(res, this);
    }
}

export class BadRequestResponse extends ApiResponse {
    constructor(message = 'Bad Request') {
        super(ResponseStatus.BADREQUEST, message);
    }
}

export class InternalErrorResponse extends ApiResponse {
    constructor(message = 'Internal Error') {
        super(ResponseStatus.INTERNALSERVER, message);
    }
}

export class SuccessMessageResponse extends ApiResponse {
    constructor(message: string) {
        super(ResponseStatus.SUCCES, message);
    }
}

export class SuccessResponse<T> extends ApiResponse {
    constructor(message: string, private data: T) {
        super(ResponseStatus.SUCCES, message);
    }

    send(res: Response): Response {
        return super.prepare<SuccessResponse<T>>(res, this);
    }
}