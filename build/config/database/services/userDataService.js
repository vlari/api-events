"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
class UserDataService {
    static findById(id) {
        return User_1.UserModel.findOne({ _id: id })
            .select('+email +password')
            .lean()
            .exec();
    }
    static findByEmail(email) {
        return User_1.UserModel.findOne({ email: email })
            .select('+email +password')
            .lean()
            .exec();
    }
    static async create(user) {
        const createdUser = await User_1.UserModel.create(user);
        return { user: createdUser.toObject() };
    }
}
exports.default = UserDataService;
