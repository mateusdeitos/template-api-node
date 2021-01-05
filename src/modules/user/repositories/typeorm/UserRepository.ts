import User from '@modules/user/entities/typeorm/User';
import { getRepository, Repository } from 'typeorm';
import { IUserRepository } from '../dto/IUserRepository';

export default class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findByProp(
    prop: keyof User,
    value: unknown,
  ): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { prop: value } });
  }
}
