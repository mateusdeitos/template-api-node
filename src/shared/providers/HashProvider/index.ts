import { container } from 'tsyringe';
import IHashProvider from './dto/IHashProvider';
import BCryptHashProvider from './implementations/BCryptHashProvider';

export const HASH_PROVIDER_TOKEN = 'HashProvider';
container.registerSingleton<IHashProvider>(
	HASH_PROVIDER_TOKEN,
	BCryptHashProvider,
);
