// This file will hold the Firebase Admin middleware to verify JWT tokens.
import admin from 'firebase-admin';
// imports backend version of firebase sdk with more admin privleges

if(!admin.apps.length){
    admin.initializeApp();
}

export const verifyToken = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({status: 'error', message: 'Unauthorized'});

        }

        const token = authHeader.split('')[1];
        const decodedToken = await admin.auth().verifyIdToken(token);

        req.user = decodedToken;
        next();


    }catch (error){
        return res.status(401).json({status: 'error', message: 'Invalid Token'})
    }
}