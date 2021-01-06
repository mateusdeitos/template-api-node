import BaseError from './BaseError';

export default class ServiceValidationException extends BaseError {
  constructor(message: string, statusCode = 400, data?: unknown) {
    super(statusCode, message, data);
  }
}
