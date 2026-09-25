import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { get7DayAnalytics } from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/7day', verifyToken, get7DayAnalytics);

export default router;
