// import { Types } from 'mongoose';
import User from  '../../../database/models/User';
import UserDataService from '../../../database/services/userDataService';
import { AuthFailureError, BadRequestError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from "../../utils/asyncHandler";
import { getHashedPassword, getSignedToken, isValidPassword } from '../../utils/authUtil';
import venv from '../../../config/env';

export const signUp = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const registeredAccount = await UserDataService.findByEmail(email);

    if (registeredAccount) throw new BadRequestError('Account already registered');

    const account = req.body;
    const hashedPassword = await getHashedPassword(req.body.password);

    const createdAccount = await UserDataService.create({
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        password: hashedPassword
    } as User);

    new SuccessResponse('Signup Successful', {
        user: createdAccount
    }).send(res);
});

export const signIn = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const registeredUser = await UserDataService.findByEmail(email);

    if (!registeredUser) throw new AuthFailureError('Ivanlid user account');

    const password = req.body.password;
    const registeredPassword = registeredUser.password;
    const isValid = await isValidPassword(password, registeredPassword);

    if (!isValid) throw new AuthFailureError('Invalid user account password');
    
    const userId = registeredUser._id;
    const token = getSignedToken({ id: userId }, venv.API_SECRET ?? '');

    new SuccessResponse('', {
        userToken: token 
    }).send(res);
});