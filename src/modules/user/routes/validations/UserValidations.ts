import Joi from '@hapi/joi';

export const UserValidationSchema = {
  store: Joi.object().keys({
    nome: Joi.string().required().min(5),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    password_confirmation: Joi.string().valid(Joi.ref('password')),
  }),
};
