import { Request, Response } from 'express';

/* eslint-disable @typescript-eslint/no-explicit-any */
type responseBodyType = any | any[];
export default class BaseController {
  protected async getResponse(
    request: Request,
    response: Response,
  ): Promise<Response> {
    return response;
  }
}
