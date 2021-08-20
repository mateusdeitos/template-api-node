import User from '../entities/typeorm/User';

export type ICreateUserDTO = Pick<User, 'nome' | 'email' | 'password'>;

export enum UserStatus {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

export type UserStatusType = `${UserStatus}`;
