import pino from 'pino';
import pinoHttp from 'pino-http';
import { env } from '../config/env'; // your environment validator

// Base logger instance
export const logger = pino({
  // Minimum log level (controlled by env)
  level: env.LOG_LEVEL || 'info',

  // Use ISO timestamps for log aggregation
  timestamp: pino.stdTimeFunctions.isoTime,

  // REDACT SENSITIVE FIELDS – CRITICAL!
  redact: {
    paths: [
      'password',
      '*.password',
      'token',
      '*.token',
      'authorization',
      '*.authorization',
      'refreshToken',
      '*.refreshToken',
      'creditCard',
      '*.creditCard',
      'ssn',
      '*.ssn',
      'email', // optional – consider if you want to obfuscate emails
    ],
    censor: '**REDACTED**',
  },

  // Standard serializers for errors and requests
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },

  // Message key – makes queries easier in tools like Loki
  messageKey: 'msg',

  // Development pretty printing
  ...(env.NODE_ENV === 'development' && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
  }),
});

// Express middleware for automatic HTTP request/response logging
export const httpLogger = pinoHttp({
  logger,

  // Custom log level based on status code
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },

  // Auto‑ignore health check endpoints
  autoLogging: {
    ignore: (req) => req.url === '/health' || req.url === '/metrics',
  },

  // Redact sensitive headers and bodies
  serializers: {
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: req.url,
      query: req.query,
      // Only log body in development (and even then, filter sensitive fields)
      ...(env.NODE_ENV === 'development' && {
        body: req.raw.body,
      }),
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
});
