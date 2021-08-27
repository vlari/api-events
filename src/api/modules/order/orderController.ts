import OrderDataService from '../../../database/services/orderDataService';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from '../../utils/asyncHandler';
import { NotFoundError } from '../../core/ApiError';
import { Types } from 'mongoose';

export const getOrders = asyncHandler(async (req, res) => {
    const orders = await OrderDataService.findOrders(new Types.ObjectId(req.user?._id));

    new SuccessResponse('',
  { data: orders }).send(res);
});

export const getOrder = asyncHandler(async (req, res) => {
    const order = await OrderDataService.findById(req.params.id);
    if (!order) throw new NotFoundError('Invalid Authorization');

    new SuccessResponse('',
  { data: order }).send(res);
});
