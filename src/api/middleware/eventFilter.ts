import jwt, { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { EventModel } from '../../database/models/Event';
import { getAccessToken } from '../utils/authUtil';
import UserDataService from '../../database/services/userDataService';
import venv from '../../config/env';
import asyncHandler from '../utils/asyncHandler';


export const getFilter = asyncHandler(async (req, res, next) => {
  let hasUserToken = false;
  let userToken: string = '';

  if (Object.keys(req.query).length !== 0) {
    let queryParams: RequestQuery = { ...req.query };

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
      userToken = getAccessToken(req.headers.authorization) || '';
    }

    hasUserToken = userToken ? true : false;

    if (hasUserToken) {
      const token = jwt.verify(userToken, venv.API_SECRET ?? '') as JwtPayload;

      const loggedInUser = await UserDataService.findById(
        new Types.ObjectId(token.id)
      );
      req.user = loggedInUser ?? undefined;
    }

    let queries: UserRequestQuery = cleanQuery(queryParams);
    queries.total = await EventModel.countDocuments(queries.query);
    req.queryParams = queries;
    next();
  } else {
    next();
  }
});

const getPriceQuery = (type: any) => {
    let price = type === 'free' ? '0' : { $gt:  '0' };
    return price;
};

const cleanQuery = (query: RequestQuery) => {
  let navigation: Navigation = new Navigation();
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
  date?: string;
  price?: any;
  filter?: string
  name?: any;
  page?: number;
  limit?: number;

  constructor(price?: any, date?: string, filter?: string, name?: any, page?: number, limit?: number) {
    this.date = date;
    this.price = price;
    this.filter = filter;
    this.name = name;
    this.page = page;
    this.limit = limit;
  }
}

export class UserRequestQuery {
  query: any;
  navigation: Navigation;
  total?: any;

  constructor(query: any, navigation: Navigation, total?: any) {
    this.query = query;
    this.navigation = navigation;
    this.total = total;
  }
}

class Navigation {
  page?: number;
  limit?: number;

  constructor(page?: number, limit?: number) {
    this.page = page;
    this.limit = limit;
  }
}