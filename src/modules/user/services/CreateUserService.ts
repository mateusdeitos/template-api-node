import { USER_REPOSITORY_TOKEN } from '@shared/container';
import ServiceValidationException from '@shared/errors/ServiceValidationException';
import { HASH_PROVIDER_TOKEN } from '@shared/providers/HashProvider';
import IHashProvider from '@shared/providers/HashProvider/dto/IHashProvider';
import { inject, injectable } from 'tsyringe';
import { ICreateUserDTO } from '../dto/ICreateUserDTO';
import User from '../entities/typeorm/User';
import { IUserRepository } from '../repositories/dto/IUserRepository';

@injectable()
export default class CreateUserService {
	constructor(
		@inject(USER_REPOSITORY_TOKEN)
		private userRepository: IUserRepository,
		@inject(HASH_PROVIDER_TOKEN)
		private hashProvider: IHashProvider,
	) {}

	private async validadeUser(user: ICreateUserDTO): Promise<void> {
		const { email } = user;
		const existeUserComMesmoEmail = await this.userRepository.findByProp(
			'email',
			email,
		);
		if (existeUserComMesmoEmail) {
			throw new ServiceValidationException(
				'Já existe um usuário com esse e-mail',
				'CONFLICT',
				[{ field: 'email', value: email }],
			);
		}
	}

	public async execute(user: ICreateUserDTO): Promise<User> {
		await this.validadeUser(user);

		const password = await this.hashProvider.generateHash(user.password);
		return this.userRepository.create({ ...user, password });
	}
}
