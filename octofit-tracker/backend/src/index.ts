import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import apiRouter from './api/routes';
import { getMongoDBConnectionString, getBaseUrl, PORT } from './config';

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware (development)
app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// MongoDB Connection
const mongoDBUri = getMongoDBConnectionString();
mongoose.connect(mongoDBUri)
  .then(() => {
    console.log('Connected to MongoDB at', mongoDBUri);
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'OctoFit Tracker API is running',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// API routes
app.use('/api', apiRouter);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  const baseUrl = getBaseUrl();
  console.log(`Server is running on ${baseUrl}`);
  console.log(`API base URL: ${baseUrl}/api`);
});
