import { Request, Response, NextFunction } from 'express';
import ServiceValidationException from '../ServiceValidationException';
import Error from '../BaseError';

export const errorMiddleware = (
  err: Error,
  _request: Request,
  response: Response,
  _: NextFunction,
): Response => {
  if (err instanceof ServiceValidationException) {
    const errorData = {
      status: 'ValidationError',
      message: err.getMessage(),
      data: err.getData(),
    };
    return response.status(err.getStatusCode()).json(errorData);
  }

  return response.status(500).json({
    status: 'error',
    message:
      process.env.NODE_ENV === 'dev' ? err.message : 'Ocorreu um erro interno.',
  });
};
