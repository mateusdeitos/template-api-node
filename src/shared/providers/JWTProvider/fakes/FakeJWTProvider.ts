import IJWTProvider, { ICreateTokenData } from '../dto/IJWTProvider';

export default class FakeJWTProvider implements IJWTProvider {
	public async generateJWTToken(data: ICreateTokenData): Promise<string> {
		const { payload, options, secretOrPrivateKey } = data;

		const token = JSON.stringify(
			payload + secretOrPrivateKey + options,
		).replace(' ', '');

		return token;
	}
}
