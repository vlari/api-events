"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sessionRouter_1 = __importDefault(require("./session/sessionRouter"));
const userRouter_1 = __importDefault(require("./user/userRouter"));
const eventRouter_1 = __importDefault(require("./event/eventRouter"));
const router = express_1.default.Router();
console.info("events here");
router.use('/session', sessionRouter_1.default);
router.use('/user', userRouter_1.default);
router.use('/events', eventRouter_1.default);
exports.default = router;
