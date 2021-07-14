import express from 'express';
import { signUp, signIn } from '../session/sessionController';
import requestValidator from '../../middleware/requestValidator/requestValidator';
import authSchema from '../../middleware/requestValidator/authSchema';

const router = express.Router();

router.route('/signup').post(requestValidator(authSchema.signUp), signUp);
router.route('/signin').post(requestValidator(authSchema.signIn), signIn);

export default router;
