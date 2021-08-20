import Joi from '@hapi/joi';
import { celebrate } from 'celebrate';

interface Params {
	query?: Joi.ObjectSchema;
	body?: Joi.ObjectSchema;
	params?: Joi.ObjectSchema;
}

export const validationMiddleware = ({
	query,
	body,
	params,
}: Params): ReturnType<typeof celebrate> => {
	const middlewares = {};
	if (query) Object.assign(middlewares, { query });
	if (body) Object.assign(middlewares, { body });
	if (params) Object.assign(middlewares, { params });

	return celebrate(middlewares, { abortEarly: true });
};
