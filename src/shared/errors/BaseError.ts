export default class Error {
	constructor(
		readonly statusCode: number,
		readonly message: string,
		readonly data?: unknown,
	) {}

	public getStatusCode(): number {
		return this.statusCode;
	}

	public getMessage(): string {
		return this.message;
	}

	public getData(): unknown {
		return this.data;
	}
}
