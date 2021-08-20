import UserToken from '@modules/userTokens/entities/typeorm/UserToken';
import { getRepository, Repository } from 'typeorm';
import { IUserTokenRepository } from '../dto/IUserTokenRepository';

export default class UserTokenRepository implements IUserTokenRepository {
	private ormRepository: Repository<UserToken>;

	constructor() {
		this.ormRepository = getRepository(UserToken);
	}

	public async createToken(userToken: UserToken): Promise<string> {
		const newToken = this.ormRepository.create(userToken);
		await this.ormRepository.save(newToken);
		return newToken.token;
	}

	public async findToken(token: string): Promise<UserToken | undefined> {
		return this.ormRepository.findOne({ where: { token } });
	}

	public async removeToken(token: string): Promise<void> {
		await this.ormRepository.delete({ token });
	}
}
