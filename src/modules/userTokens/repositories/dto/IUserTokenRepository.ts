import UserToken from '../../entities/typeorm/UserToken';

export interface IUserTokenRepository {
  findToken(token: string): Promise<UserToken | undefined>;
  createToken(userToken: UserToken): Promise<string>;
  removeToken(token: string): Promise<void>;
}
