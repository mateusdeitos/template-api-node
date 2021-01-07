import { sign } from 'jsonwebtoken';
import IJWTProvider, { ICreateTokenData } from '../dto/IJWTProvider';

export default class JsonWebTokenProvider implements IJWTProvider {
  public async generateJWTToken(data: ICreateTokenData): Promise<string> {
    const { payload, options, secretOrPrivateKey } = data;

    const token = sign(payload || {}, secretOrPrivateKey, options);

    return token;
  }
}
