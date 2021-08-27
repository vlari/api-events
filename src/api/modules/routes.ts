import express from 'express';
import sessionRouter from './session/sessionRouter';
import userRouter from './user/userRouter';
import eventRouter from './event/eventRouter';

const router = express.Router();

router.use('/session', sessionRouter);
router.use('/user', userRouter);
router.use('/events', eventRouter);

export default router;