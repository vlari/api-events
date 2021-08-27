import Order, { OrderModel } from '../models/Order';
import { Types } from 'mongoose';

export default class OrderDataService {
  public static async findOrders(userId: Types.ObjectId): Promise<Order[]> {
    return OrderModel.find({ 'user.userId': userId })
    .exec();
  }

  public static findById(id: string): Promise<Order | null> {
    return OrderModel
    .findOne({ _id: id })
    .lean<Order>().exec();
  }
}
