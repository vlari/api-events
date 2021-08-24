"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRequestQuery = exports.getFilter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
const Event_1 = require("../../database/models/Event");
const authUtil_1 = require("../utils/authUtil");
const userDataService_1 = __importDefault(require("../../database/services/userDataService"));
const env_1 = __importDefault(require("../../config/env"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
exports.getFilter = asyncHandler_1.default(async (req, res, next) => {
    var _a;
    let hasUserToken = false;
    let userToken = '';
    if (Object.keys(req.query).length !== 0) {
        let queryParams = { ...req.query };
        if (queryParams.filter) {
            const name = queryParams.filter;
            let regValue = new RegExp(name.toString(), 'i');
            queryParams.name = { $regex: regValue };
            delete queryParams.filter;
        }
        if (queryParams.date === 'anyDate' || !queryParams.date) {
            delete queryParams.date;
        }
        if (queryParams.price) {
            if (queryParams.price !== 'anyPrice') {
                queryParams.price = getPriceQuery(queryParams.price);
            }
        }
        if (req.headers.authorization) {
            userToken = authUtil_1.getAccessToken(req.headers.authorization) || '';
        }
        hasUserToken = userToken ? true : false;
        if (hasUserToken) {
            const token = jsonwebtoken_1.default.verify(userToken, (_a = env_1.default.API_SECRET) !== null && _a !== void 0 ? _a : '');
            const loggedInUser = await userDataService_1.default.findById(new mongoose_1.Types.ObjectId(token.id));
            req.user = loggedInUser !== null && loggedInUser !== void 0 ? loggedInUser : undefined;
        }
        let queries = cleanQuery(queryParams);
        queries.total = await Event_1.EventModel.countDocuments(queries.query);
        req.queryParams = queries;
        next();
    }
    else {
        next();
    }
});
// export const getFilter1 = async (req, res, next) => {
//   if (req.query) {
//     let queryParams = { ...req.query };
//     if (queryParams.filter) {
//       const name = queryParams.filter;
//       let regValue = new RegExp(name, 'i');
//       queryParams.name = { $regex: regValue };
//       delete queryParams.filter;
//     }
//     if (queryParams.date === 'anyDate' || !queryParams.date) {
//       delete queryParams.date;
//     }
//     if (queryParams.price) {
//       if (queryParams.price !== 'anyPrice') {
//         queryParams['ticket.price'] = getPriceQuery(queryParams.price);;
//       }
//       delete queryParams.price;
//     }
//     let userToken = getUserToken(req);
//     if (userToken) {
//       const token = jwt.verify(userToken, venv.API_SECRET);
//       const loggedInUser = await User.findById(token.id);
//       req.user = loggedInUser;
//     }
//     queryParams = cleanQuery(queryParams);
//     queryParams.total = await Event.countDocuments(queryParams.query);
//     req.queryParams = queryParams;
//     next();
//   } else {
//     req.queryParams = {};
//     next();
//   }
// };
const getPriceQuery = (type) => {
    let price = type === 'free' ? '0' : { $gt: '0' };
    return price;
};
const cleanQuery = (query) => {
    let navigation = new Navigation();
    if (query.page) {
        navigation.page = query.page;
        delete query.page;
    }
    if (query.limit) {
        navigation.limit = query.limit;
        delete query.limit;
    }
    return { query, navigation };
};
class RequestQuery {
    constructor(price, date, filter, name, page, limit) {
        this.date = date;
        this.price = price;
        this.filter = filter;
        this.name = name;
        this.page = page;
        this.limit = limit;
    }
}
class UserRequestQuery {
    constructor(query, navigation, total) {
        this.query = query;
        this.navigation = navigation;
        this.total = total;
    }
}
exports.UserRequestQuery = UserRequestQuery;
class Navigation {
    constructor(page, limit) {
        this.page = page;
        this.limit = limit;
    }
}
