import { ICreateUserDTO } from '@modules/user/dto/ICreateUserDTO';
import User from '@modules/user/entities/typeorm/User';

export interface IUserRepository {
  create(user: ICreateUserDTO): Promise<User>;
  findByProp(
    prop: keyof User,
    value: User[keyof User],
  ): Promise<User | undefined>;
}
