import User, { UserModel } from '../models/User';
import { Types } from 'mongoose';


export default class UserDataService {
  public static findById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id })
      .select('+email +password')
      .lean<User>()
      .exec();
  }

  public static findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email: email })
      .select('+email +password')
      .lean<User>()
      .exec();
  }

  public static async create(
    user: User
  ): Promise<{ user: User }> {
    const createdUser = await UserModel.create(user);
    return { user: createdUser.toObject() };
  }


}
