import express from 'express';
import { updateAccount } from '../user/userController';
import guard from '../../middleware/auth';

const router = express.Router();

router.route('/').patch(guard, updateAccount);

export default router;