import express from 'express';
import { updateAccount, getSavedEvents, deleteSavedEvent } from '../user/userController';
import guard from '../../middleware/auth';

const router = express.Router();

router.route('/').patch(guard, updateAccount);
router.route('/saved').get(guard, getSavedEvents);
router.route('/saved').delete(guard, deleteSavedEvent);

export default router;