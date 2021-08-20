interface tokenOptions {
	expiresIn: string;
	subject: string;
}
export interface ICreateTokenData {
	payload?: string | Record<string, unknown>;
	secretOrPrivateKey: string;
	options: tokenOptions;
}
export default interface IJWTProvider {
	generateJWTToken(data: ICreateTokenData): Promise<string>;
}
