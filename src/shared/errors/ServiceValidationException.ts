import BaseError from './BaseError';
import { HTTPStatusCodeEnum } from './dto/HTTPStatusCodeEnum';

export default class ServiceValidationException extends BaseError {
  constructor(
    message: string,
    statusCode: keyof typeof HTTPStatusCodeEnum = 'BAD_REQUEST',
    data?: unknown,
  ) {
    super(HTTPStatusCodeEnum[statusCode], message, data);
  }
}
