import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getDailyLog, logMeal, deleteMeal } from '../controllers/logController.js';

const router = express.Router();

router.get('/daily', verifyToken, getDailyLog);
router.post('/meal', verifyToken, logMeal);
router.delete('/meal/:mealId', verifyToken, deleteMeal);

export default router;
