"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAccount = void 0;
const userDataService_1 = __importDefault(require("../../../database/services/userDataService"));
const ApiError_1 = require("../../core/ApiError");
const ApiResponse_1 = require("../../core/ApiResponse");
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const mongoose_1 = require("mongoose");
exports.updateAccount = asyncHandler_1.default(async (req, res) => {
    const user = req.user;
    const registeredUser = await userDataService_1.default.findById(new mongoose_1.Types.ObjectId(user === null || user === void 0 ? void 0 : user._id));
    if (!registeredUser)
        throw new ApiError_1.BadRequestError('User not registered');
    if (req.body.name)
        user.name = req.body.name;
    if (req.body.dateOfBirth)
        user.dateOfBirth = req.body.dateOfBirth;
    if (req.body.phone)
        user.phone = req.body.phone;
    if (req.body.address)
        user.address = req.body.address;
    if (req.body.email)
        user.email = req.body.email;
    const updatedUser = await userDataService_1.default.update(user);
    new ApiResponse_1.SuccessResponse('Account successfully updated', {
        user: updatedUser
    }).send(res);
});
