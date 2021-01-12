import { ConnectionOptions } from 'typeorm';
import 'dotenv/config';

const entities =
  process.env.NODE_ENV === 'dev'
    ? [String(process.env.TYPEORM_ENTITIES_LOCAL)]
    : [String(process.env.TYPEORM_ENTITIES_DEPLOY)];

const config: ConnectionOptions = {
  type: process.env.TYPEORM_CONNECTION as 'mariadb',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  connectTimeout: 60000,
  acquireTimeout: 60000,
  entities,
  migrations: [String(process.env.TYPEORM_MIGRATIONS)],
  cli: {
    migrationsDir: String(process.env.TYPEORM_MIGRATIONS_DIR),
  },
  logging: 'all',
  logger: 'file',
  charset: 'utf8mb4',
};

export default config;
