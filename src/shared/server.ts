import 'reflect-metadata';
import 'dotenv/config';
import { errors } from 'celebrate';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import '@shared/typeorm';
import '@shared/container';
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
