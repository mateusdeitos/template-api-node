import UserToken from '@modules/userTokens/entities/typeorm/UserToken';
import {
  saveObjectInRepository,
  findEntityInRepositoryByProp,
  removeEntityFromRepository,
} from '@shared/utils/testUtils';
import { IUserTokenRepository } from '../dto/IUserTokenRepository';

export default class FakeUserTokenRepository implements IUserTokenRepository {
  private ormRepository: UserToken[];

  constructor() {
    this.ormRepository = [];
  }

  public async findToken(token: string): Promise<UserToken | undefined> {
    return findEntityInRepositoryByProp(this.ormRepository, {
      propName: 'token',
      propValue: token,
    });
  }

  public async createToken(userToken: UserToken): Promise<string> {
    const newToken = {
      ...new UserToken(),
      ...userToken,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const savedToken = saveObjectInRepository(this.ormRepository, newToken);
    return savedToken.token;
  }

  public async removeToken(token: string): Promise<void> {
    const userToken = await this.findToken(token);
    if (userToken) {
      removeEntityFromRepository(this.ormRepository, userToken);
    }
  }
}
