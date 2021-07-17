import User from '../../database/models/User';
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
    }
  }
}
// export interface ProtectedCustomRequest extends Request {
//   user: User;
// }
