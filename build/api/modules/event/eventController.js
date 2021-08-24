"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = void 0;
const eventDataService_1 = __importDefault(require("../../../database/services/eventDataService"));
const ApiResponse_1 = require("../../core/ApiResponse");
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
exports.getEvents = asyncHandler_1.default(async (req, res) => {
    var _a, _b, _c;
    const query = (_a = req.queryParams) === null || _a === void 0 ? void 0 : _a.query;
    const navigation = (_b = req.queryParams) === null || _b === void 0 ? void 0 : _b.navigation;
    const total = (_c = req.queryParams) === null || _c === void 0 ? void 0 : _c.total;
    const page = (navigation === null || navigation === void 0 ? void 0 : navigation.page) || 1;
    const limit = (navigation === null || navigation === void 0 ? void 0 : navigation.limit) || 6;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const events = await eventDataService_1.default.findEvents(query, startIndex, limit);
    let nextPage;
    let prevPage;
    console.info("page is: ", page);
    if (endIndex < total) {
        nextPage = {
            page: +page + 1,
            limit,
        };
    }
    if (startIndex > 0) {
        prevPage = {
            page: page - 1,
            limit,
        };
    }
    const pagination = {
        total: total,
        next: nextPage,
        prev: prevPage
    };
    if (req.user) {
        // const collection = await Collection.findOne({ userId: req.user._id });
        // if (collection && collection.events) {
        //   collection.events.forEach((eventId) => {
        //     events.forEach((event) => {
        //       if (eventId.toString() === event._id.toString()) {
        //         event.liked = true;
        //       }
        //     });
        //   });
        // }
    }
    new ApiResponse_1.SuccessResponse('', { count: events.length, data: events, pagination }).send(res);
});
