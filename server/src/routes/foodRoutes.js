import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { searchFoods, createFood } from '../controllers/foodController.js';

const router = express.Router();

router.get('/', verifyToken, searchFoods);
router.post('/', verifyToken, createFood);

export default router;
