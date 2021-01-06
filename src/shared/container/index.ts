import { container } from 'tsyringe';
import '../providers';
import { IUserRepository } from '@modules/user/repositories/dto/IUserRepository';
import UserRepository from '@modules/user/repositories/typeorm/UserRepository';

export const USER_REPOSITORY_TOKEN = 'UserRepository';
container.registerSingleton<IUserRepository>(
  USER_REPOSITORY_TOKEN,
  UserRepository,
);
