import { model, Schema, Types } from 'mongoose';

export default interface User {
  _id: Types.ObjectId;
  name: string;
  dateOfBirth: Date;
  phone: string;
  address: string;
  email: string;
  password: string;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    phone: String,
    address: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      minlength: 8,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<User>('User', userSchema, 'users');
