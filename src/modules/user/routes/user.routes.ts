import { celebrate } from 'celebrate';
import { Router } from 'express';
import UserController from '../controllers/UserController';
import { UserValidationSchema } from './validations/UserValidations';

const userRouter = Router();
const userController = new UserController();

userRouter.post(
	'/',
	celebrate(
		{
			body: UserValidationSchema.store,
		},
		{ abortEarly: false },
	),
	userController.store,
);

export default userRouter;
