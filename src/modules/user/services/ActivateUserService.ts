import { injectable, inject } from 'tsyringe';
import ServiceValidationException from '@shared/errors/ServiceValidationException';
import { validate } from 'uuid';
import accountConfig from '@config/account';
import { addHours, isAfter } from 'date-fns';
import {
	USER_REPOSITORY_TOKEN,
	USER_TOKEN_REPOSITORY_TOKEN,
} from '@shared/container';
import { IUserTokenRepository } from '@modules/userTokens/repositories/dto/IUserTokenRepository';
import { IUserRepository } from '../repositories/dto/IUserRepository';
import { IActivateUserDTO } from '../dto/IActivateUserDTO';
import { UserStatus } from '../dto/ICreateUserDTO';

@injectable()
export class ActivateUserService {
	constructor(
		@inject(USER_REPOSITORY_TOKEN)
		private usersRepository: IUserRepository,
		@inject(USER_TOKEN_REPOSITORY_TOKEN)
		private usersTokenRepository: IUserTokenRepository,
	) {}

	public async execute({ token }: IActivateUserDTO): Promise<void> {
		// Verifica se o token existe e se é de um formato válido
		if (!token || !validate(token))
			throw new ServiceValidationException(
				'O token informado é inválido.',
				'BAD_REQUEST',
			);

		const userToken = await this.usersTokenRepository.findToken(token);

		if (!userToken)
			throw new ServiceValidationException(
				`Esse token não foi encontrado: ${token}`,
				'NOT_FOUND',
			);

		const { id_user, created_at } = userToken;

		const dateToCompare = addHours(created_at, accountConfig.tokenExpiryTime);

		if (isAfter(new Date(Date.now()), dateToCompare)) {
			throw new ServiceValidationException('Token expirado.', 'FORBIDDEN');
		}

		const user = await this.usersRepository.findByProp('id', id_user);

		if (!user)
			throw new ServiceValidationException(
				`Não foi encontrado um usuário com o id: ${id_user}`,
				'NOT_FOUND',
			);

		await Promise.all([
			this.usersRepository.updateProp(id_user, 'status', UserStatus.ACTIVE),
			this.usersTokenRepository.removeToken(token),
		]);
	}
}
