"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sessionController_1 = require("../session/sessionController");
const requestValidator_1 = __importDefault(require("../../middleware/requestValidator/requestValidator"));
const authSchema_1 = __importDefault(require("../../middleware/requestValidator/authSchema"));
const router = express_1.default.Router();
router.route('/signup').post(requestValidator_1.default(authSchema_1.default.signUp), sessionController_1.signUp);
router.route('/signin').post(requestValidator_1.default(authSchema_1.default.signIn), sessionController_1.signIn);
exports.default = router;
