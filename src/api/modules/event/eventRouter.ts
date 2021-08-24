import express from 'express';
import { getEvents, getEvent } from './eventController';
import { getFilter } from '../../middleware/eventFilter';

const router = express.Router();

console.info("events router");

router.route('/').get(getFilter, getEvents);
router.route('/:id').get(getEvent);

export default router;