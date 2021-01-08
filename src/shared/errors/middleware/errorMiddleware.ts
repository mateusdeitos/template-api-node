import { Request, Response, NextFunction } from 'express';
import ServiceValidationException from '../ServiceValidationException';
import Error from '../BaseError';
import ForbiddenRouteException from '../ForbiddenRouteException';
import { HTTPStatusCodeEnum } from '../dto/HTTPStatusCodeEnum';

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
  if (err instanceof ForbiddenRouteException) {
    const errorData = {
      status: 'ForbiddenRouteError',
      message: err.getMessage(),
    };
    return response.status(err.getStatusCode()).json(errorData);
  }

  return response.status(HTTPStatusCodeEnum.INTERNAL_ERROR).json({
    status: 'error',
    message:
      process.env.NODE_ENV === 'dev' ? err.message : 'Ocorreu um erro interno.',
  });
};
