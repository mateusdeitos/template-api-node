import { bodyValidationMiddleware } from '@shared/routes/middlewares/bodyValidationMiddleware';
import { Router } from 'express';
import AuthenticationController from '../controllers/AuthenticationController';
import { UserValidationSchema } from './validations/UserValidations';

const authRouter = Router();
const authController = new AuthenticationController();

authRouter.post(
	'/',
	bodyValidationMiddleware(UserValidationSchema.login),
	authController.store,
);

export default authRouter;
