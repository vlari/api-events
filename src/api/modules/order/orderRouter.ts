import express from 'express';
import { getOrders, getOrder} from './orderController';
import guard from '../../middleware/auth';

const router = express.Router();

router.route('/').get(guard, getOrders);
router.route('/:id').get(guard, getOrder);

export default router;