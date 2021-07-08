"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("./config/env"));
const chalk_1 = __importDefault(require("chalk"));
const app_1 = __importDefault(require("./api/app"));
const port = env_1.default.PORT;
app_1.default.listen(port, () => {
    console.log(chalk_1.default.green(`Server running in ${env_1.default.NODE_ENV} environment`));
    console.log(chalk_1.default.blue.inverse(`Server running on port: ${port}`));
});
// console.log('Hello World');
