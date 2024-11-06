import express from 'express';
import { getTodayStatistic } from './controllers/searchController.js';
import { getMonthsStatistic } from './controllers/statisticController.js';

const router = express.Router();

router.get('/api/today', getTodayStatistic);
router.get('/api/statistic', getMonthsStatistic);

export default router;