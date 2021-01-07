import { USER_REPOSITORY_TOKEN } from '@shared/container';
import ServiceValidationException from '@shared/errors/ServiceValidationException';
import { HASH_PROVIDER_TOKEN } from '@shared/providers/HashProvider';
import IHashProvider from '@shared/providers/HashProvider/dto/IHashProvider';
import { JWT_PROVIDER_TOKEN } from '@shared/providers/JWTProvider';
import IJWTProvider from '@shared/providers/JWTProvider/dto/IJWTProvider';
import {
  throwIfSomeTestFails,
  throwIfTestFail,
} from '@shared/utils/validationUtils';
import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { ICreateUserDTO } from '../dto/ICreateUserDTO';
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
    const user = await throwIfTestFail({
      test: this.userRepository.findByProp('email', email),
      condition: false,
      message: 'Usuário não encontrado',
      statusCode: 404,
      Exception: ServiceValidationException,
    });

    if (user) {
      await throwIfTestFail({
        test: this.hashProvider.compareHash(password, user.password),
        condition: false,
        message: 'E-mail ou senha incorreto(s)',
        statusCode: 400,
        Exception: ServiceValidationException,
      });
    }
    return classToClass(user) || new User();
  }

  public async execute(
    data: IAuthenticateUserDTO,
  ): Promise<IResponseAuthenticationDTO> {
    const user = await this.validateAuth(data);

    const token = await this.jwtProvider.generateJWTToken({
      options: { expiresIn: '30d', subject: user.id.toString() },
      secretOrPrivateKey: process.env.SEGREDO || 'some-secret',
    });

    return {
      user,
      token,
    };
  }
}
