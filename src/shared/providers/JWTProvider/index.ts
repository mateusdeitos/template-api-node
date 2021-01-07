import { container } from 'tsyringe';
import IJWTProvider from './dto/IJWTProvider';
import JsonWebTokenProvider from './implementations/JsonWebTokenProvider';

export const JWT_PROVIDER_TOKEN = 'JWTProvider';
container.registerSingleton<IJWTProvider>(
  JWT_PROVIDER_TOKEN,
  JsonWebTokenProvider,
);
