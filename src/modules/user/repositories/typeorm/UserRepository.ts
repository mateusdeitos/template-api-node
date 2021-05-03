import { ICreateUserDTO } from '@modules/user/dto/ICreateUserDTO';
import User from '@modules/user/entities/typeorm/User';
import { getRepository, Repository } from 'typeorm';
import { IUserRepository } from '../dto/IUserRepository';

export default class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(user: ICreateUserDTO): Promise<User> {
    const newUser = this.ormRepository.create(user);
    return this.ormRepository.save(newUser);
  }

  public async findByProp(
    prop: keyof User,
    value: User[keyof User],
  ): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { [prop]: value } });
  }
}
