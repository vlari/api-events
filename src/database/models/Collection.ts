import { model, Schema, Types } from 'mongoose';

export default interface Collection {
  userId: Types.ObjectId;
  events: any[];
}

const collectionSchema = new Schema(
  {
    userId: String,
    events: [],
  },
  {
    timestamps: true,
  }
);

export const CollectionModel = model<Collection>(
  'Collection',
  collectionSchema,
  'collections'
);
