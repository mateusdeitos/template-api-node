import BaseError from './BaseError';
import { HTTPStatusCodeEnum, HTTPStatusType } from './dto/HTTPStatusCodeEnum';

export default class ServiceValidationException extends BaseError {
  constructor(
    message: string,
    statusCode: HTTPStatusType = 'BAD_REQUEST',
    data?: unknown,
  ) {
    super(HTTPStatusCodeEnum[statusCode], message, data);
  }
}
