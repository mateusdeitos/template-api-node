import { ICreateUserDTO } from '@modules/user/dto/ICreateUserDTO';
import User from '@modules/user/entities/typeorm/User';

export interface IUserRepository {
  save(user: ICreateUserDTO): Promise<User>;
  findByProp(prop: keyof User, value: unknown): Promise<User | undefined>;
}
