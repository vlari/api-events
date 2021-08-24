"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userDataService_1 = __importDefault(require("../../database/services/userDataService"));
const mongoose_1 = require("mongoose");
const env_1 = __importDefault(require("../../config/env"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const authUtil_1 = require("../utils/authUtil");
const ApiError_1 = require("../core/ApiError");
const guard = asyncHandler_1.default(async (req, res, next) => {
    var _a;
    if (!req.headers.authorization)
        throw new ApiError_1.AuthFailureError('Invalid Authorization');
    let userToken = authUtil_1.getAccessToken(req.headers.authorization);
    if (!userToken)
        throw new ApiError_1.AuthFailureError('Invalid Authorization');
    try {
        const token = jsonwebtoken_1.default.verify(userToken, (_a = env_1.default.API_SECRET) !== null && _a !== void 0 ? _a : '');
        const account = await userDataService_1.default.findById(new mongoose_1.Types.ObjectId(token.id));
        if (!account)
            throw new ApiError_1.AuthFailureError('Invalid User');
        req.user = account;
        return next();
    }
    catch (err) {
        throw new ApiError_1.AccessTokenError(err.message);
    }
});
exports.default = guard;
