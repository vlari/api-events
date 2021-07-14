"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignedToken = exports.isValidPassword = exports.getHashedPassword = exports.getAccessToken = void 0;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
const ApiError_1 = require("../core/ApiError");
const getAccessToken = (authorization) => {
    if (!authorization)
        throw new ApiError_1.AuthFailureError('Invalid Authorization');
    if (!authorization.startsWith('Bearer '))
        throw new ApiError_1.AuthFailureError('Invalid Authorization');
    return authorization.split(' ')[1];
};
exports.getAccessToken = getAccessToken;
const getHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};
exports.getHashedPassword = getHashedPassword;
const isValidPassword = async (password, accountPassword) => {
    const isValid = await bcrypt.compare(password, accountPassword);
    return isValid;
};
exports.isValidPassword = isValidPassword;
const getSignedToken = (payload, privateKey) => {
    const token = jwt.sign(payload, privateKey, { expiresIn: '1h' });
    return token;
};
exports.getSignedToken = getSignedToken;
