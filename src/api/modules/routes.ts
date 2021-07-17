import express from 'express';
import sessionRouter from './session/sessionRouter';
import userRouter from './user/userRouter';

const router = express.Router();

router.use('/session', sessionRouter);
router.use('/user', userRouter);

export default router;