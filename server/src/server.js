import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js"
import { connectDB, getDatabaseStatus } from './config/db.js';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Security and HTTP Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cors({
  origin: [CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Base Route
app.get('/', (req, res) => {
  res.status(200).json({
    app: 'Health Analytics & Nutrition Planner API',
    version: '1.0.0',
    status: 'online',
    designSystem: 'Nutritional Intelligence',
    documentation: '/api/health'
  });
});

// Health Check Endpoint (Stage 1 Milestone Verification)
app.get('/api/health', (req, res) => {
  const dbStatus = getDatabaseStatus();

  res.status(200).json({
    status: 'success',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
    environment: process.env.NODE_ENV || 'development',
    server: {
      port: PORT,
      status: 'healthy'
    },
    database: dbStatus
  });
});

import profileRoutes from "./routes/profileRoutes.js"
import foodRoutes from "./routes/foodRoutes.js"
import logRoutes from "./routes/logRoutes.js"

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/logs", logRoutes);
// 404 Catch-All Handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);

  // Do not leak raw error messages in production
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal Server Error"
      : err.message || "Internal Server Error";
  res.status(err.status || 500).json({
    status: "error",
    message: message,
  });
});

// Start Server and Initialize Database
const startServer = async () => {
  // Connect to Database
  await connectDB();

  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 NutriTrack API running at: http://localhost:${PORT}`);
    console.log(`🩺 Health check endpoint:   http://localhost:${PORT}/api/health`);
    console.log(`🌐 Allowed Client Origin:    ${CLIENT_URL}`);
    console.log(`======================================================\n`);
  });
};

startServer();
