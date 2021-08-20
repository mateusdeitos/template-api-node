import Joi from '@hapi/joi';
import { validationMiddleware } from './validationMiddleware';

export const bodyValidationMiddleware = (
	body: Joi.ObjectSchema,
): ReturnType<typeof validationMiddleware> => {
	return validationMiddleware({
		body,
	});
};
