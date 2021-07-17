"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './src/config/.env' });
const env = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    DB_URI: process.env.DB_URI,
    DB_NAME: process.env.DB_NAME,
    API_SECRET: process.env.API_SECRET
};
exports.default = env;
