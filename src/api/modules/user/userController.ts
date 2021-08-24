import UserDataService from '../../../database/services/userDataService';
import { AuthFailureError, BadRequestError, NotFoundError } from '../../core/ApiError';
import CollectionDataService from '../../../database/services/collectionDataService';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from '../../utils/asyncHandler';
import { Types } from 'mongoose';

export const updateAccount = asyncHandler(async (req, res) => {
    const user = req.user;

    const registeredUser = await UserDataService.findById(new Types.ObjectId(user?._id));
    if (!registeredUser) throw new BadRequestError('User not registered');

    if (req.body.name) user!.name = req.body.name;
    if (req.body.dateOfBirth) user!.dateOfBirth = req.body.dateOfBirth;
    if (req.body.phone) user!.phone = req.body.phone;
    if (req.body.address) user!.address = req.body.address;
    if (req.body.email) user!.email = req.body.email;

    const updatedUser = await UserDataService.update(user!);

    new SuccessResponse('Account successfully updated',
    {
        user: updatedUser
    }).send(res);
});

export const getSavedEvents = asyncHandler(async (req, res) => {
    const savedEvents = await CollectionDataService.findByUserId(new Types.ObjectId(req.user?._id));

    new SuccessResponse('', {
        savedEvents
    }).send(res);
});

export const deleteSavedEvent = asyncHandler(async (req, res) => {
    const savedEvents = await CollectionDataService.findByUserId(new Types.ObjectId(req.user?._id));

    if (!savedEvents) throw new BadRequestError('User not registered');

    const savedCollection = savedEvents.events.map(event => {
        return `${req.user?._id}` != req.params.id;
    });

    const index = savedEvents.events.indexOf(`${req.user?._id}`);
    savedEvents.events.splice(index, 1);

    await CollectionDataService.delete(req.user?._id!, savedEvents);

    new SuccessResponse('', {}).send(res);
});