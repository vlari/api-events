"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventController_1 = require("./eventController");
const eventFilter_1 = require("../../middleware/eventFilter");
const router = express_1.default.Router();
console.info("events router");
router.route('/').get(eventFilter_1.getFilter, eventController_1.getEvents);
exports.default = router;
