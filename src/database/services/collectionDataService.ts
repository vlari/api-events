import Collection, { CollectionModel } from '../models/Collection';
import { Types } from 'mongoose';

export default class CollectionDataService {
  public static findByUserId(id: Types.ObjectId): Promise<Collection | null> {
    return CollectionModel.findOne({ userId: id }).lean<Collection>().exec();
  }

  public static async create(collection: Collection): Promise<{ collection: Collection }> {
    const createdCollection = await CollectionModel.create(collection);
    return { collection: createdCollection.toObject() };
  }

  public static async delete(id: Types.ObjectId, collection: Collection): Promise<{ collection: Collection }> {
    await CollectionModel.updateOne({ userId: id }, { $set: { ...collection } })
      .lean()
      .exec();

    return { collection };
  }

}
