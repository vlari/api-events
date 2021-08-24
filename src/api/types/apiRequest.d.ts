import User from '../../database/models/User';
import { UserRequestQuery } from '../middleware/eventFilter';
// import { Request } from 'express';
import * as express from 'express';

// declare namespace Express {
//   export interface Request {
//     user: User;
//   }
// }

declare global {
  namespace Express {
    interface Request {
      user?: User
      queryParams?: UserRequestQuery
    }
  }
}
// export interface ProtectedCustomRequest extends Request {
//   user: User;
// }
