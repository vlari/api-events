import User from '../../config/database/models/User';
import { Request } from 'express';

declare interface ProtectedRequest extends Request {
    user: User;
  }