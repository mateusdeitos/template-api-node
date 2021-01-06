import userRouter from '@modules/user/routes/user.routes';
import { Router } from 'express';

const routes = Router();
routes.use('/users', userRouter);
export default routes;
