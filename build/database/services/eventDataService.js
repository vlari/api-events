"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../models/Event");
class EventDataService {
    static async findEvents(query, startIndex, limit) {
        return Event_1.EventModel.find(query)
            .skip(startIndex)
            .limit(limit)
            .exec();
    }
}
exports.default = EventDataService;
