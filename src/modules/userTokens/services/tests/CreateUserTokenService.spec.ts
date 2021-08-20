import User from '@modules/user/entities/typeorm/User';
import FakeUserRepository from '@modules/user/repositories/fakes/FakeUserRepository';
import CreateUserService from '@modules/user/services/CreateUserService';
import FakeUserTokenRepository from '@modules/userTokens/repositories/fakes/FakeUserTokenRepository';
import ServiceValidationException from '@shared/errors/ServiceValidationException';
import FakeHashProvider from '@shared/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserTokenService from '../CreateUserTokenService';

describe('Create User Tokens', () => {
	let fakeUserRepository: FakeUserRepository;
	let fakeHashProvider: FakeHashProvider;
	let fakeUserTokenRepository: FakeUserTokenRepository;
	let createUserService: CreateUserService;
	let createUserTokenService: CreateUserTokenService;
	let user: User;

	beforeEach(async () => {
		fakeUserRepository = new FakeUserRepository();
		fakeUserTokenRepository = new FakeUserTokenRepository();
		fakeHashProvider = new FakeHashProvider();
		createUserService = new CreateUserService(
			fakeUserRepository,
			fakeHashProvider,
		);
		createUserTokenService = new CreateUserTokenService(
			fakeUserTokenRepository,
			fakeUserRepository,
		);
		user = await createUserService.execute({
			...new User(),
			nome: 'Joãozinho',
			password: 'teste1234',
			email: 'joaozinho@teste123.com.br',
		});
	});

	it('Should be able to create a token', async () => {
		const expectedToken = 'huaehiuaehiuae';
		const token = await createUserTokenService.execute({
			id_user: user.id,
			token: expectedToken,
		});

		expect(token).toBe(expectedToken);
	});

	it('Should not be able to create a token for an invalid user', async () => {
		await expect(
			createUserTokenService.execute({
				id_user: 123123123123123,
				token: 'huaehiuaehiuae',
			}),
		).rejects.toBeInstanceOf(ServiceValidationException);
	});
});
