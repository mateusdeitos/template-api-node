import { USER_REPOSITORY_TOKEN } from '@shared/container';
import ServiceValidationException from '@shared/errors/ServiceValidationException';
import { inject, injectable } from 'tsyringe';
import User from '../entities/typeorm/User';
import { IUserRepository } from '../repositories/dto/IUserRepository';

@injectable()
export default class SearchUserService {
	constructor(
		@inject(USER_REPOSITORY_TOKEN)
		private userRepository: IUserRepository,
	) {}

	public async execute(
		prop: keyof User,
		value: User[keyof User],
	): Promise<User> {
		const user = await this.userRepository.findByProp(prop, value);
		if (!user) {
			throw new ServiceValidationException(`User not found`, 'NOT_FOUND');
		}

		return user;
	}
}
