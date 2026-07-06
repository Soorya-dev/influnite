// Global error handler middleware — catches all errors and returns standardized responses
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/throw-error';
import { logger } from '../utils/logger';
import { HttpStatus } from '../utils/constants/status-codes';

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction): void => {
  // Handle known operational errors thrown via throwError/AppError
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      ok: false,
      message: err.message,
      data: null,
    });
    return;
  }

  // Handle Mongoose validation errors (e.g. required fields, enum mismatch)
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors || {}).map((e: any) => e.message);
    res.status(HttpStatus.BAD_REQUEST).json({
      ok: false,
      message: messages[0] || 'Validation failed',
      data: null,
    });
    return;
  }

  // Handle MongoDB duplicate key errors (e.g. duplicate email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    res.status(HttpStatus.CONFLICT).json({
      ok: false,
      message: `An account with this ${field} already exists`,
      data: null,
    });
    return;
  }

  // Log unexpected errors for debugging
  logger.error({ err: err.message, stack: err.stack }, 'Unexpected server error');

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    ok: false,
    message: 'Internal server error',
    data: null,
  });
};
