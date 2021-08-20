import { Request, Response, NextFunction } from 'express';
import { CelebrateError, isCelebrate } from 'celebrate';
import ServiceValidationException from '../ServiceValidationException';
import Error from '../BaseError';
import ForbiddenRouteException from '../ForbiddenRouteException';
import { HTTPStatusCodeEnum } from '../dto/HTTPStatusCodeEnum';

interface CelebrateError {
	joi: { message: string };
}

type ErrorType = Error & CelebrateError;

export const errorMiddleware = (
	err: ErrorType,
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

	if (isCelebrate(err)) {
		let message = 'Ocorreu um erro de validação';
		if (err.joi) {
			message = err.joi.message;
		}

		return response.status(HTTPStatusCodeEnum.BAD_REQUEST).json({
			status: 'ValidationError',
			message,
		});
	}

	return response.status(HTTPStatusCodeEnum.INTERNAL_ERROR).json({
		status: 'error',
		message:
			process.env.NODE_ENV === 'dev' ? err.message : 'Ocorreu um erro interno.',
	});
};
