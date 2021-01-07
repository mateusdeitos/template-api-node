import { ICreateUserDTO } from '@modules/user/dto/ICreateUserDTO';
import User from '@modules/user/entities/typeorm/User';
import {
  saveObjectInRepository,
  findEntityInRepositoryByProp,
} from '@shared/utils/testUtils';
import { IUserRepository } from '../dto/IUserRepository';

export default class FakeUserRepository implements IUserRepository {
  private ormRepository: User[];

  constructor() {
    this.ormRepository = [];
  }

  public async create(user: ICreateUserDTO): Promise<User> {
    const newUser = {
      ...new User(),
      ...user,
      created_at: new Date(),
      updated_at: new Date(),
    };
    return saveObjectInRepository(this.ormRepository, newUser);
  }

  public async findByProp(
    prop: keyof User,
    value: User[keyof User],
  ): Promise<User | undefined> {
    return findEntityInRepositoryByProp(this.ormRepository, {
      propName: prop,
      propValue: value,
    });
  }
}
