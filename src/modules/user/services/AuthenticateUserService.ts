import { USER_REPOSITORY_TOKEN } from '@shared/container';
import ServiceValidationException from '@shared/errors/ServiceValidationException';
import { HASH_PROVIDER_TOKEN } from '@shared/providers/HashProvider';
import IHashProvider from '@shared/providers/HashProvider/dto/IHashProvider';
import { JWT_PROVIDER_TOKEN } from '@shared/providers/JWTProvider';
import IJWTProvider from '@shared/providers/JWTProvider/dto/IJWTProvider';
import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';
import authConfig from '@config/auth';
import User from '../entities/typeorm/User';
import { IUserRepository } from '../repositories/dto/IUserRepository';
import {
  IAuthenticateUserDTO,
  IResponseAuthenticationDTO,
} from '../dto/IAuthenticateUserDTO';

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject(USER_REPOSITORY_TOKEN)
    private userRepository: IUserRepository,
    @inject(HASH_PROVIDER_TOKEN)
    private hashProvider: IHashProvider,
    @inject(JWT_PROVIDER_TOKEN)
    private jwtProvider: IJWTProvider,
  ) {}

  private async validateAuth({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<User> {
    const user = await this.userRepository.findByProp('email', email);
    if (!user) {
      throw new ServiceValidationException(
        'Usuário não encontrado',
        'NOT_FOUND',
      );
    }

    const { password: userPassword } = user;
    if (!(await this.hashProvider.compareHash(password, userPassword))) {
      throw new ServiceValidationException(
        'E-mail ou senha incorreto(s)',
        'BAD_REQUEST',
      );
    }

    return classToClass(user);
  }

  public async execute(
    data: IAuthenticateUserDTO,
  ): Promise<IResponseAuthenticationDTO> {
    const user = await this.validateAuth(data);
    const { expiresIn, secretOrPrivateKey } = authConfig;
    const token = await this.jwtProvider.generateJWTToken({
      options: { expiresIn, subject: user.id.toString() },
      secretOrPrivateKey,
    });

    return {
      user,
      token,
    };
  }
}
