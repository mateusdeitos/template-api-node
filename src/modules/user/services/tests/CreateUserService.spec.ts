import User from '@modules/user/entities/typeorm/User';
import ServiceValidationException from '@shared/errors/ServiceValidationException';
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../../repositories/fakes/FakeUserRepository';
import CreateUserService from '../CreateUserService';

describe('Criação de Usuários', () => {
  let fakeUserRepository: FakeUserRepository;
  let createUserService: CreateUserService;
  let fakeHashProvider: FakeHashProvider;

  beforeEach(async () => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('Deve poder criar um usuário', async () => {
    const user = await createUserService.executa({
      ...new User(),
      nome: 'Joãozinho',
      password: 'teste1234',
      email: 'joaozinho@teste123.com.br',
    });
    expect(user).toBeDefined();
    expect(user.id).toBe(1);
  });
  it('Não deve poder criar 2 usuários com o mesmo e-mail', async () => {
    await createUserService.executa({
      ...new User(),
      nome: 'Joãozinho',
      password: 'teste1234',
      email: 'joaozinho@teste123.com.br',
    });
    await expect(
      createUserService.executa({
        ...new User(),
        nome: 'Joãozinho',
        password: 'teste1234',
        email: 'joaozinho@teste123.com.br',
      }),
    ).rejects.toBeInstanceOf(ServiceValidationException);
  });
});
