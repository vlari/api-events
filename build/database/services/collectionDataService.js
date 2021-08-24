"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Collection_1 = require("../models/Collection");
class CollectionDataService {
    static findByUserId(id) {
        return Collection_1.CollectionModel.findOne({ userId: id }).lean().exec();
    }
    static async create(collection) {
        const createdCollection = await Collection_1.CollectionModel.create(collection);
        return { collection: createdCollection.toObject() };
    }
}
exports.default = CollectionDataService;
