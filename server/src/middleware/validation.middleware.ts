import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { HttpStatus } from '../utils/constants/status-codes';
import { throwError } from '../utils/throw-error';

export const validateRequest =
  (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues[0]?.message || 'Validation failed';
      throwError(message, HttpStatus.BAD_REQUEST);
    }

    req.body = result.data;
    next();
  };
