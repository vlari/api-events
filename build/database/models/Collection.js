"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionModel = void 0;
const mongoose_1 = require("mongoose");
const collectionSchema = new mongoose_1.Schema({
    userId: String,
    events: [],
}, {
    timestamps: true,
});
exports.CollectionModel = mongoose_1.model('Collection', collectionSchema, 'collections');
