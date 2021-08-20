/* eslint-disable no-console */
import { createConnection } from 'typeorm';
import config from '@config/database';

createConnection(config)
	.then(() => console.log('✅ - Conectado ao DB'))
	.then(() => console.log('config', JSON.stringify(config, null, 2)))
	.catch(error =>
		console.log(`❌ - Ocorreu um erro ao conectar no DB: ${error.message}`),
	);
