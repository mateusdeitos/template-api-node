import BaseController from '@shared/controllers/BaseController';
import { IControllers } from '@shared/controllers/dto/IControllers';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { HTTPStatusCodeEnum } from '@shared/errors/dto/HTTPStatusCodeEnum';
import { ActivateUserService } from '../services/ActivateUserService';

export class AccountController extends BaseController implements IControllers {
	public async update(request: Request, response: Response): Promise<Response> {
		const { token } = request.query;

		const activateUserService = container.resolve(ActivateUserService);

		await activateUserService.execute({ token: String(token) });

		return super.getResponse(
			request,
			response.status(HTTPStatusCodeEnum.SUCCESS_NO_CONTENT).send(),
		);
	}
}
