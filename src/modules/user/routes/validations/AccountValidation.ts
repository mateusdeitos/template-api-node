import Joi from '@hapi/joi';

export const AccountValidationSchema = {
	activate: Joi.object().keys({
		token: Joi.string().uuid().required(),
	}),
	forgotPassword: Joi.object().keys({
		email: Joi.string().email().required(),
	}),
	resetPassword: Joi.object().keys({
		token: Joi.string().uuid().required(),
		password: Joi.string().required(),
	}),
};
