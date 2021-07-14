"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chalk_1 = __importDefault(require("chalk"));
const env_1 = __importDefault(require("../../config/env"));
const connectionOptions = '?retryWrites=true&w=majority';
const connectionString = `${env_1.default.DB_URI}/${env_1.default.DB_NAME}${connectionOptions}`;
console.info('cstring: ', connectionString);
mongoose_1.default
    .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log(chalk_1.default.inverse.yellow('Database connection has been stablished successfully'));
})
    .catch((e) => {
    console.log(chalk_1.default.inverse.red('Unable to connect to the database', e));
});
mongoose_1.default.connection.on('error', (err) => {
    console.log(chalk_1.default.inverse.red('Database connectionerror' + err));
});
process.on('SIGINT', () => {
    mongoose_1.default.connection.close(() => {
        console.log(chalk_1.default.inverse.yellow('Database connection terminated'));
        process.exit(0);
    });
});
