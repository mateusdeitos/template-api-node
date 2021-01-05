import 'reflect-metadata';
import 'dotenv/config';
import { errors } from 'celebrate';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import '@shared/typeorm';
import '@shared/container';

const server = express();
server.use(cors());
server.use(express.json());
server.use(routes);

server.use(errors());
// server.use((err: Error, request: Request, response: Response, _: NextFunction) => {
//   if (err instanceof AppError) {
//     return response.status(err.statusCode).json({
//       status: 'error',
//       message: err.message,
//     });
//   }

//   return response.status(500).json({
//     status: 'error',
//     message: err.message,
//   });
// });

server.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`✅ - back-end rodando! na porta ${process.env.PORT}`);
});
