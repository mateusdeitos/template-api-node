import { ICreateUserDTO } from '@modules/user/dto/ICreateUserDTO';
import User from '@modules/user/entities/typeorm/User';
import { IBaseRepository } from '@shared/repositories/IBaseRepository';

export interface IUserRepository extends IBaseRepository<User> {
	create(user: ICreateUserDTO): Promise<User>;
}
