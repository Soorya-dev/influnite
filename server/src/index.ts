import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/database';
import { env as ENV } from './config/env';
import influencerAuthRoutes from './routes/influencer/influencer-auth.routes';
import brandAuthRoutes from './routes/brand/brand-auth.routes';
import { logger, httpLogger } from './utils/logger';
import { errorHandler } from './middleware/error-handler.middleware';
import { throwError } from './utils/throw-error';
import { HttpResponse } from './utils/constants/response-messages';
import { HttpStatus } from './utils/constants/status-codes';

const app = express();
const PORT = ENV.PORT;

// Request logging
app.use(httpLogger);

// Middleware
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ ok: true, message: 'Server is running', data: null });
});

// Routes
app.use('/api/influencer/auth', influencerAuthRoutes);
app.use('/api/brand/auth', brandAuthRoutes);

// 404 handler for unknown routes (Express v5 compatible)
app.use((_req, _res) => {
  throwError(HttpResponse.PAGE_NOT_FOUND, HttpStatus.NOT_FOUND);
});

// Global error handler — must be registered last
app.use(errorHandler);

// Connect to MongoDB and start server
connectDB();

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
