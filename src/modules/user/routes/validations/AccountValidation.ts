import Joi from '@hapi/joi';

export const AccountValidationSchema = {
	activate: Joi.object().keys({
		token: Joi.string().uuid().required(),
	}),
};
