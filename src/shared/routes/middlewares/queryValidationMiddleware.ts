import Joi from '@hapi/joi';
import { validationMiddleware } from './validationMiddleware';

export const queryValidationMiddleware = (
	query: Joi.ObjectSchema,
): ReturnType<typeof validationMiddleware> => {
	return validationMiddleware({
		query,
	});
};
