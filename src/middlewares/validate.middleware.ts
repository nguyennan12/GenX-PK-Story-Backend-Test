import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { ZodType } from 'zod';
import { AppError } from '../utils/app-error.js';

export function validateBody(schema: ZodType): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join('.') || '(root)',
        reason: issue.message,
      }));

      next(new AppError(400, 'VALIDATION_ERROR', 'Invalid input', details));
      return;
    }

    req.body = result.data;
    next();
  };
}
