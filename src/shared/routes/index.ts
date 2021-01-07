import authRouter from '@modules/user/routes/authentication.routes';
import userRouter from '@modules/user/routes/user.routes';
import { Router } from 'express';

const routes = Router();
routes.use('/v1/users', userRouter);
routes.use('/v1/sessions', authRouter);
export default routes;
