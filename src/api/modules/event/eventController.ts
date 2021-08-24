import EventDataService from '../../../database/services/eventDataService';
import CollectionDataService from '../../../database/services/collectionDataService';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from '../../utils/asyncHandler';
import { Types } from 'mongoose';

export const getEvents = asyncHandler(async (req, res) => {
  const query = req.queryParams?.query;
  const navigation = req.queryParams?.navigation;
  const total = req.queryParams?.total;

  const page = navigation?.page || 1;
  const limit = navigation?.limit || 6;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const events = await EventDataService.findEvents(query, startIndex, limit);
  let nextPage: any;
  let prevPage: any;

  if (endIndex < total) {
    nextPage = {
      page: +page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    prevPage = {
      page: page - 1,
      limit,
    };
  }

  const pagination: {
    total: number;
    next: any;
    prev: any;
  } = { 
    total: total, 
    next: nextPage, 
    prev: prevPage 
  };

  if (req.user) {
    const collection = await CollectionDataService.findByUserId(new Types.ObjectId(req.user?._id));

    if (collection && collection.events) {
      collection.events.forEach((eventId) => {
        events.forEach((event) => {
          if (eventId.toString() === event._id.toString()) {
            event.liked = true;
          }
        });
      });
    }
  }

  new SuccessResponse('',
  { count: events.length , data: events, pagination }).send(res);
});

export const getEvent = asyncHandler(async (req, res) => {
  const event = await EventDataService.findById(new Types.ObjectId(req.params.id));

  new SuccessResponse('',
  { data: event }).send(res);
});
