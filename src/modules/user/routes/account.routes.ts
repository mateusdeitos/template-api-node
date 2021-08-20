import { Router } from 'express';
import { queryValidationMiddleware } from '@shared/routes/middlewares/queryValidationMiddleware';
import { AccountValidationSchema } from './validations/AccountValidation';
import { AccountController } from '../controllers/AccountController';

const accountRouter = Router();
const accountController = new AccountController();

accountRouter.post(
	'/activate',
	queryValidationMiddleware(AccountValidationSchema.activate),
	accountController.update,
);

export default accountRouter;
