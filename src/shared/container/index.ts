import { container } from 'tsyringe';
import '../providers';
import { IUserRepository } from '@modules/user/repositories/dto/IUserRepository';
import UserRepository from '@modules/user/repositories/typeorm/UserRepository';
import { IUserTokenRepository } from '@modules/userTokens/repositories/dto/IUserTokenRepository';
import UserTokenRepository from '@modules/userTokens/repositories/typeorm/UserTokenRepository';

export const USER_REPOSITORY_TOKEN = 'UserRepository';
export const USER_TOKEN_REPOSITORY_TOKEN = 'UserTokenRepository';
container.registerSingleton<IUserRepository>(
  USER_REPOSITORY_TOKEN,
  UserRepository,
);
container.registerSingleton<IUserTokenRepository>(
  USER_TOKEN_REPOSITORY_TOKEN,
  UserTokenRepository,
);
