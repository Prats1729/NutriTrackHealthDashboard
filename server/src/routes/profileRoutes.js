import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getProfile, updateProfile } from '../controllers/profileController.js';

const router = express.Router();

// Both routes are protected by verifyToken to ensure only authenticated users can access their profile
router.get('/', verifyToken, getProfile);
router.put('/', verifyToken, updateProfile);

export default router;
