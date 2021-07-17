import UserDataService from '../../../database/services/userDataService';
import { AuthFailureError, BadRequestError } from '../../core/ApiError';
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