// This file will hold the Firebase Admin middleware to verify JWT tokens.
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// In ES Modules, we have to manually recreate __dirname to locate the JSON file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serviceAccountPath = path.join(__dirname, '../../serviceAccountKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

try {
  // Use getApps() for ES Modules instead of admin.apps
  if (!getApps().length) {
    initializeApp({
      credential: cert(serviceAccount)
    });
    console.log("✅ [Auth] Firebase Admin initialized successfully");
  }
} catch (error) {
  console.error("❌ [Auth] Failed to initialize Firebase Admin. Check credentials.", error.message);
}

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({status: 'error', message: 'Unauthorized'});
        }

        // Fixed the split bug: split(' ') instead of split('')
        const token = authHeader.split(' ')[1];
        
        // Use getAuth() to verify token
        const decodedToken = await getAuth().verifyIdToken(token);

        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({status: 'error', message: 'Invalid Token'})
    }
}