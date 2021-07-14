"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const userDataService_1 = __importDefault(require("../../../config/database/services/userDataService"));
const ApiError_1 = require("../../core/ApiError");
const ApiResponse_1 = require("../../core/ApiResponse");
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const authUtil_1 = require("../../utils/authUtil");
const env_1 = __importDefault(require("../../../config/env"));
exports.signUp = asyncHandler_1.default(async (req, res) => {
    const email = req.body.email;
    const registeredAccount = await userDataService_1.default.findByEmail(email);
    if (registeredAccount)
        throw new ApiError_1.BadRequestError('Account already registered');
    const account = req.body;
    const hashedPassword = await authUtil_1.getHashedPassword(req.body.password);
    const createdAccount = await userDataService_1.default.create({
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        password: hashedPassword
    });
    new ApiResponse_1.SuccessResponse('Signup Successful', {
        user: createdAccount
    }).send(res);
});
exports.signIn = asyncHandler_1.default(async (req, res) => {
    var _a;
    const email = req.body.email;
    const registeredUser = await userDataService_1.default.findByEmail(email);
    if (!registeredUser)
        throw new ApiError_1.AuthFailureError('Ivanlid user account');
    const password = req.body.password;
    const registeredPassword = registeredUser.password;
    const isValid = await authUtil_1.isValidPassword(password, registeredPassword);
    if (!isValid)
        throw new ApiError_1.AuthFailureError('Invalid user account password');
    const userId = registeredUser._id;
    const token = authUtil_1.getSignedToken({ id: userId }, (_a = env_1.default.API_SECRET) !== null && _a !== void 0 ? _a : '');
    new ApiResponse_1.SuccessResponse('', {
        userToken: token
    }).send(res);
});
