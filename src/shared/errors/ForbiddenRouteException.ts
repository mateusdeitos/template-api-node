import BaseError from './BaseError';
import { HTTPStatusCodeEnum, HTTPStatusType } from './dto/HTTPStatusCodeEnum';

export default class ForbiddenRouteException extends BaseError {
	constructor(message: string, statusCode: HTTPStatusType = 'FORBIDDEN') {
		super(HTTPStatusCodeEnum[statusCode], message);
	}
}
