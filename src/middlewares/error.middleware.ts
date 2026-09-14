import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/app-error.js';


interface ErrorResponseBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export function notFoundHandler(req: Request, res: Response): void {
  const body: ErrorResponseBody = {
    error: {
      code: 'StatusCodes',
      message: `Route ${req.method} ${req.originalUrl} not found`,
    },
  };
  res.status(404).json(body);
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof AppError) {
    const body: ErrorResponseBody = {
      error: {
        code: err.code,
        message: err.message,
        ...(err.details !== undefined ? { details: err.details } : {}),
      },
    };
    res.status(err.statusCode).json(body);
    return;
  }

  console.error('Unexpected error:', err);

  const body: ErrorResponseBody = {
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
    },
  };
  res.status(500).json(body);
}
