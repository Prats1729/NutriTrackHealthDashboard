import mongoose from 'mongoose';

/**
 * Connect to MongoDB database using Mongoose.
 * Supports MongoDB Atlas and local instances.
 */
export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('❌ [Database] MONGO_URI is not defined in environment variables.');
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ [Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`⚠️ [Database] Connection Error: ${error.message}`);
    console.info('💡 Note: Update server/.env with your valid MongoDB Atlas connection string (MONGO_URI).');
  }
};

/**
 * Returns human-readable state of the database connection.
 */
export const getDatabaseStatus = () => {
  const stateMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  const stateCode = mongoose.connection.readyState;
  return {
    stateCode,
    status: stateMap[stateCode] || 'unknown',
    host: mongoose.connection.host || null,
    dbName: mongoose.connection.name || null
  };
};

// Graceful connection cleanup on process termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed due to app termination.');
  process.exit(0);
});
