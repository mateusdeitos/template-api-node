import { IUserTokenRepository } from '@modules/userTokens/repositories/dto/IUserTokenRepository';
import {
	USER_REPOSITORY_TOKEN,
	USER_TOKEN_REPOSITORY_TOKEN,
} from '@shared/container';
import ServiceValidationException from '@shared/errors/ServiceValidationException';
import { HASH_PROVIDER_TOKEN } from '@shared/providers/HashProvider';
import IHashProvider from '@shared/providers/HashProvider/dto/IHashProvider';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../repositories/dto/IUserRepository';

interface IResetPasswordDTO {
	token: string;
	password: string;
}

@injectable()
export default class ResetPasswordService {
	constructor(
		@inject(USER_REPOSITORY_TOKEN)
		private userRepository: IUserRepository,
		@inject(USER_TOKEN_REPOSITORY_TOKEN)
		private userTokenRepository: IUserTokenRepository,
		@inject(HASH_PROVIDER_TOKEN)
		private hashProvider: IHashProvider,
	) {}

	public async execute({ password, token }: IResetPasswordDTO): Promise<void> {
		const userToken = await this.userTokenRepository.findToken(token);
		if (!userToken) {
			throw new ServiceValidationException(`Invalid token`, 'NOT_FOUND');
		}

		const { id_user } = userToken;
		const hashed = await this.hashProvider.generateHash(password);

		await this.userRepository.updateProp(id_user, 'password', hashed);
		await this.userTokenRepository.removeToken(token);
	}
}
