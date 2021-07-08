"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const chalk_1 = __importDefault(require("chalk"));
const env_1 = __importDefault(require("../config/env"));
// Error handler
require("../config/database");
// seeder
// router
process.on('uncaughtException', (error) => {
    console.log(chalk_1.default.red('Uncaught Exception ' + error));
    process.exit(1);
});
const app = express_1.default();
app.use(express_1.default.json());
if (env_1.default.NODE_ENV === 'development') {
    app.use(morgan_1.default('dev'));
}
exports.default = app;
