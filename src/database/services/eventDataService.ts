import Event, { EventModel } from '../models/Event';
import { Types } from 'mongoose';

export default class EventDataService {

    public static async findEvents(
        query: any,
        startIndex: number,
        limit: number): Promise<Event[]> {

        return EventModel.find(query)
            .skip(startIndex)
            .limit(limit)
            .exec();
    }

    public static findById(id: Types.ObjectId): Promise<Event | null> {
        return EventModel.findOne({ _id: id })
          .lean<Event>()
          .exec();
      }

}