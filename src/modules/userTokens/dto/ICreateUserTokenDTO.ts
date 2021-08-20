import UserToken from '@modules/userTokens/entities/typeorm/UserToken';

export type ICreateUserTokenDTO = Omit<
	UserToken,
	'id' | 'created_at' | 'updated_at' | 'user'
>;
