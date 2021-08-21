import { Router } from 'express';
import { queryValidationMiddleware } from '@shared/routes/middlewares/queryValidationMiddleware';
import { bodyValidationMiddleware } from '@shared/routes/middlewares/bodyValidationMiddleware';
import { AccountValidationSchema } from './validations/AccountValidation';
import { AccountController } from '../controllers/AccountController';
import { ForgotPasswordController } from '../controllers/ForgotPasswordController';

const accountRouter = Router();
const accountController = new AccountController();
const forgotPasswordController = new ForgotPasswordController();

accountRouter.post(
	'/activate',
	queryValidationMiddleware(AccountValidationSchema.activate),
	accountController.update,
);

accountRouter.post(
	'/forgot-password',
	bodyValidationMiddleware(AccountValidationSchema.forgotPassword),
	forgotPasswordController.store,
);

accountRouter.post(
	'/reset-password',
	bodyValidationMiddleware(AccountValidationSchema.resetPassword),
	forgotPasswordController.update,
);

export default accountRouter;
