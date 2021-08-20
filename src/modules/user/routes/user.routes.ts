import { bodyValidationMiddleware } from '@shared/routes/middlewares/bodyValidationMiddleware';
import { Router } from 'express';
import UserController from '../controllers/UserController';
import { UserValidationSchema } from './validations/UserValidations';

const userRouter = Router();
const userController = new UserController();

userRouter.post(
	'/',
	bodyValidationMiddleware(UserValidationSchema.store),
	userController.store,
);

export default userRouter;
