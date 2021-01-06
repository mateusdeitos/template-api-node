import { Response } from 'express';

/* eslint-disable @typescript-eslint/no-explicit-any */
type responseBodyType = any | any[];
export default class BaseController {
  protected response: { body: responseBodyType; status: number };

  constructor() {
    this.response = { body: {}, status: 200 };
  }

  protected async getResponse(response: Response): Promise<Response> {
    return response
      .status(this.getResponseStatus())
      .json(this.getResponseBody());
  }

  protected getResponseBody(): responseBodyType {
    return this.response.body;
  }

  protected getResponseStatus(): number {
    return this.response.status;
  }

  protected setResponseBody(data: responseBodyType): void {
    this.response.body = data;
  }

  protected setResponseStatus(_status: number): void {
    this.response.status = _status;
  }
}
