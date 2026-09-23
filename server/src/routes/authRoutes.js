// This file will define the auth-related API routes.
import express from 'express';
// Imports Express so we can use its routing tools.

import { verifyToken } from '../middleware/auth.js';
// Imports the security bouncer we built.

import { syncUser } from '../controllers/authController.js';
// Imports the logic that talks to the database.

const router = express.Router();
// Creates a new mini-application specifically for handling authentication URLs.

router.post('/sync', verifyToken, syncUser);
// Tells the router: When a POST request comes to '/sync', first run the 'verifyToken' function. If it passes, run the 'syncUser' function.

export default router;
// Exports this mini-application so the main server.js file can use it.
