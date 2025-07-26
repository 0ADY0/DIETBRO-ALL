// server.js - Complete and Final Working Version

import 'dotenv/config'; // Loads environment variables from .env file directly
import express from 'express';
import mongoose from 'mongoose'; // Mongoose is needed for DB connection
import cors from 'cors';

// Import local modules (ensure these files exist and are correctly set up as ES Modules)
import connectDB from './config/database.js';
import errorHandler from './middleware/errorHandler.js';
import userRoutes from './routes/userRoutes.js'; // User-related routes
import blogRoutes from './routes/blogRoutes.js'; // Blog-related routes

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
// Enable CORS for specified origins
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://your-domain.com'] // Replace with your actual production frontend URL
    : ['http://localhost:3000', 'http://localhost:5173', 'https://localhost:5173'], // Your frontend URL
  credentials: true
}));

// Parse JSON and URL-encoded data with a 10MB limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next(); // Pass control to the next middleware/route handler
});

// Main API Routes
// All user-related routes will be prefixed with /api/users
app.use('/api/users', userRoutes);
// All blog-related routes will be prefixed with /api/blogs
app.use('/api/blogs', blogRoutes);

// Health check endpoint - for verifying API status
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Dietbro API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Root endpoint - basic welcome message
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Dietbro API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      users: '/api/users',
      userStats: '/api/users/stats',
      blogs: '/api/blogs',
      blogStats: '/api/blogs/stats'
    }
  });
});

// 404 Not Found handler - for any routes not defined above
// FIX: Changed '*' to '/*splat' for Express v5 compatibility.
// In Express v5, wildcards must be named. 'splat' is a common convention.
app.use('/*splat', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global Error handler middleware (MUST be the last middleware in the chain)
app.use(errorHandler);

// Define the port the server will listen on
const PORT = process.env.PORT || 5000;

// Start the Express server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
});

// Handle unhandled promise rejections (e.g., failed database connection, unawaited async calls)
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Unhandled Rejection: ${err.message}`);
  // Close server gracefully and exit process with failure code
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions (synchronous errors not caught by try/catch)
process.on('uncaughtException', (err) => {
  console.log(`❌ Uncaught Exception: ${err.message}`);
  // Exit process with failure code
  process.exit(1);
});
// Export the app instance (useful for testing)
export default app;
