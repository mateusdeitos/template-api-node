import { createConnection } from 'typeorm';
import config from '@config/database';

createConnection(config)
  .then(() => console.log('✅ - Conectado ao DB'))
  .catch(error =>
    console.log(`❌ - Ocorreu um erro ao conectar no DB: ${error.message}`),
  );