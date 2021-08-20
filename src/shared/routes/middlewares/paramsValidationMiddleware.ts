import Joi from '@hapi/joi';
import { validationMiddleware } from './validationMiddleware';

export const paramsValidationMiddleware = (
	params: Joi.ObjectSchema,
): ReturnType<typeof validationMiddleware> => {
	return validationMiddleware({
		params,
	});
};
