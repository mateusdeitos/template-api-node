import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv/config';
import '@shared/typeorm';
import { errors } from 'celebrate';
import '@shared/container';
import routes from './routes';
import { errorMiddleware } from './errors/middleware/errorMiddleware';

const server = express();
server.use(cors());
server.use(express.json());
server.use(routes);

server.use(errors());
server.use(errorMiddleware);

server.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`✅ - back-end rodando! na porta ${process.env.PORT}`);
});
