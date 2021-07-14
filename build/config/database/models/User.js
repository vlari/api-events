"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    dateOfBirth: {
        type: Date
    },
    phone: String,
    address: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String,
        minlength: 8,
        select: false,
    }
}, {
    timestamps: true,
});
exports.UserModel = mongoose_1.model('User', userSchema, 'users');
