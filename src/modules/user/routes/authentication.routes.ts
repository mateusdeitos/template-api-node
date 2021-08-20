import { celebrate } from 'celebrate';
import { Router } from 'express';
import AuthenticationController from '../controllers/AuthenticationController';
import { UserValidationSchema } from './validations/UserValidations';

const authRouter = Router();
const authController = new AuthenticationController();

authRouter.post(
	'/',
	celebrate(
		{
			body: UserValidationSchema.login,
		},
		{ abortEarly: false },
	),
	authController.store,
);

export default authRouter;
