"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const chalk_1 = __importDefault(require("chalk"));
const env_1 = __importDefault(require("../config/env"));
require("../config/database");
const ApiError_1 = require("./core/ApiError");
const routes_1 = __importDefault(require("./modules/routes"));
// seeder
process.on('uncaughtException', (err) => {
    console.log(chalk_1.default.red('Uncaught Exception ' + err));
    process.exit(1);
});
const app = express_1.default();
app.use(express_1.default.json());
app.use('/api', routes_1.default);
if (env_1.default.NODE_ENV === 'development') {
    app.use(morgan_1.default('dev'));
}
app.use((req, res, next) => next(new ApiError_1.NotFoundError()));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
    if (err instanceof ApiError_1.ApiError) {
        ApiError_1.ApiError.handle(err, res);
    }
    else {
        if (env_1.default.NODE_ENV === 'development') {
            console.log(chalk_1.default.inverse.red(err));
            return res.status(500).send(err.message);
        }
        ApiError_1.ApiError.handle(new ApiError_1.InternalError(), res);
    }
});
exports.default = app;
