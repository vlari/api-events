"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const guard = asyncHandler_1.default(async (req, res, next) => {
    // let userToken = getAccessToken(req.headers.authorization);
    // try {
    //   const token = jwt.verify(userToken, venv.API_SECRET);
    //   const account = await UserDataService.findById(new Types.ObjectId(token.id));
    //   if (!account) throw new AuthFailureError('Invalid User');
    //   req.user = account
    //   return next();
    // } catch (err) {
    //   throw new AccessTokenError(err.message);
    // }
    next();
});
exports.default = guard;
