import { string } from '@hapi/joi';
import User from '@modules/user/entities/typeorm/User';
import ServiceValidationException from '@shared/errors/ServiceValidationException';
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';
import FakeJWTProvider from '@shared/providers/JWTProvider/fakes/FakeJWTProvider';
import FakeUserRepository from '../../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from '../AuthenticateUserService';
import CreateUserService from '../CreateUserService';

describe('Criação de Usuários', () => {
  let fakeUserRepository: FakeUserRepository;
  let createUserService: CreateUserService;
  let authenticateUserService: AuthenticateUserService;
  let fakeHashProvider: FakeHashProvider;
  let fakeTokenProvider: FakeJWTProvider;
  let createdUser: User;

  beforeEach(async () => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeTokenProvider = new FakeJWTProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeTokenProvider,
    );
    createdUser = await createUserService.execute({
      ...new User(),
      nome: 'Joãozinho',
      password: 'teste1234',
      email: 'joaozinho@teste123.com.br',
    });
  });

  it('Deve poder autenticar um usuário', async () => {
    const { email, password } = createdUser;
    const { token, user } = await authenticateUserService.execute({
      email,
      password,
    });
    expect(token).toBeDefined();
    expect(user).toBeDefined();
    expect(user).toHaveProperty('email');
    expect(user.email).toBe(createdUser.email);
  });
  it('Não deve poder autenticar um usuário que não existe', async () => {
    const promise = authenticateUserService.execute({
      email: '12312123',
      password: '123123',
    });
    await expect(promise).rejects.toBeInstanceOf(ServiceValidationException);
    await expect(promise).rejects.toMatchObject({
      message: expect.any(String),
      statusCode: 404,
    });
  });
  it('Não deve poder autenticar um usuário com uma senha incorreta', async () => {
    const { email, password } = createdUser;
    const promise = authenticateUserService.execute({
      email,
      password: 'aaaaaaaaaaaa',
    });
    await expect(promise).rejects.toBeInstanceOf(ServiceValidationException);
    await expect(promise).rejects.toMatchObject({
      message: expect.any(String),
      statusCode: 400,
    });
  });
});
