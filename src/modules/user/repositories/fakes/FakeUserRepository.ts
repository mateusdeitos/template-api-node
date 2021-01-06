import User from '@modules/user/entities/typeorm/User';
import {
  saveEntityInRepository,
  findEntityInRepositoryByProp,
} from '@shared/utils/testUtils';
import { IUserRepository } from '../dto/IUserRepository';

export default class FakeUserRepository implements IUserRepository {
  private ormRepository: User[];

  constructor() {
    this.ormRepository = [];
  }

  public async save(user: User): Promise<User> {
    const newUser = {
      ...user,
      created_at: new Date(),
      updated_at: new Date(),
    };
    return saveEntityInRepository(this.ormRepository, newUser);
  }

  public async findByProp(
    prop: keyof User,
    value: unknown,
  ): Promise<User | undefined> {
    return findEntityInRepositoryByProp(this.ormRepository, {
      propName: prop,
      propValue: value,
    });
  }
}
