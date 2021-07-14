"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationSource = void 0;
const ApiError_1 = require("../../core/ApiError");
var ValidationSource;
(function (ValidationSource) {
    ValidationSource["BODY"] = "body";
    ValidationSource["HEADER"] = "headers";
    ValidationSource["QUERY"] = "query";
    ValidationSource["PARAM"] = "params";
})(ValidationSource = exports.ValidationSource || (exports.ValidationSource = {}));
exports.default = (schema, source = ValidationSource.BODY) => (req, res, next) => {
    const validationResult = schema.validate(req[source]);
    if (!validationResult.error)
        return next();
    try {
        const message = validationResult.error.details[0].message;
        next(new ApiError_1.BadRequestError(message));
    }
    catch {
        next();
    }
};
