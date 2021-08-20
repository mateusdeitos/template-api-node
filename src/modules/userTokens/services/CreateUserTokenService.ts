import { IUserRepository } from '@modules/user/repositories/dto/IUserRepository';
import {
	USER_REPOSITORY_TOKEN,
	USER_TOKEN_REPOSITORY_TOKEN,
} from '@shared/container';
import ServiceValidationException from '@shared/errors/ServiceValidationException';
import { inject, injectable } from 'tsyringe';
import { ICreateUserTokenDTO } from '../dto/ICreateUserTokenDTO';
import UserToken from '../entities/typeorm/UserToken';
import { IUserTokenRepository } from '../repositories/dto/IUserTokenRepository';

@injectable()
export default class CreateUserTokenService {
	constructor(
		@inject(USER_TOKEN_REPOSITORY_TOKEN)
		private userTokenRepository: IUserTokenRepository,
		@inject(USER_REPOSITORY_TOKEN)
		private userRepository: IUserRepository,
	) {}

	public async execute({
		id_user,
		token,
	}: ICreateUserTokenDTO): Promise<string> {
		const user = await this.userRepository.findByProp('id', id_user);
		if (!user) {
			throw new ServiceValidationException('Invalid user.', 'NOT_FOUND');
		}

		return this.userTokenRepository.createToken({
			...new UserToken(),
			id_user,
			user,
			token,
		});
	}
}
