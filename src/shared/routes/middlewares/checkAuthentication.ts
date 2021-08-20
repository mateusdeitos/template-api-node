import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import ForbiddenRouteException from '@shared/errors/ForbiddenRouteException';

interface TokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

export const checkAuthentication = (
	request: Request,
	_: Response,
	next: NextFunction,
): void => {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new ForbiddenRouteException('JWT token is missing.', 'FORBIDDEN');
	}

	// 1ª posição é o 'Bearer', não será utilizada
	// 2ª posição é o token
	const [, token] = authHeader.split(' ');
	const { secretOrPrivateKey } = authConfig;

	try {
		const decoded = verify(token, secretOrPrivateKey);

		const { sub } = decoded as TokenPayload;

		request.user = {
			id: sub,
		};

		return next();
	} catch (error) {
		throw new ForbiddenRouteException('Invalid JWT token.', 'FORBIDDEN');
	}
};
