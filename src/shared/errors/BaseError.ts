export default class Error {
  constructor(
    private statusCode: number,
    private message: string,
    private data?: unknown,
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
