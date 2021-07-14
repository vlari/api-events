"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = {
    signUp: joi_1.default.object({
        name: joi_1.default.string().required(),
        dateOfBirth: joi_1.default.string().required(),
        email: joi_1.default.string()
            .pattern(/^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/)
            .required(),
        password: joi_1.default.string().min(8).required(),
    }),
    signIn: joi_1.default.object({
        email: joi_1.default.string()
            .pattern(/^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/)
            .required(),
        password: joi_1.default.string().min(8).required(),
    }),
};
