import BaseController from '@shared/controllers/BaseController';
import { IControllers } from '@shared/controllers/dto/IControllers';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { HTTPStatusCodeEnum } from '@shared/errors/dto/HTTPStatusCodeEnum';
import SendMailService from '@shared/services/SendMailService';
import mailConfig from '@config/mail';
import path from 'path';
import CreateUserTokenService from '@modules/userTokens/services/CreateUserTokenService';
import { v4 } from 'uuid';
import SearchUserService from '../services/SearchUserService';
import ResetPasswordService from '../services/ResetPasswordService';

export class ForgotPasswordController
	extends BaseController
	implements IControllers
{
	public async store(request: Request, response: Response): Promise<Response> {
		const { email } = request.body;

		const searchUserService = container.resolve(SearchUserService);
		const sendMailService = container.resolve(SendMailService);
		const createUserTokenService = container.resolve(CreateUserTokenService);

		const user = await searchUserService.execute('email', email);
		const token = await createUserTokenService.execute({
			id_user: user.id,
			token: v4(),
		});

		await sendMailService.execute({
			subject: 'Forgot Password',
			to: {
				email,
				name: user.nome,
			},
			from: mailConfig.defaults.from,
			template: {
				file: path.resolve(__dirname, '..', 'templates', 'forgot_password.hbs'),
				variables: {
					name: user.nome,
					link: `${process.env.FRONTEND_URL}?token=${token}`,
					team: 'MyTeam',
				},
			},
		});

		const res =
			process.env.NODE_ENV === 'dev'
				? () => response.json({ token })
				: () => response.status(HTTPStatusCodeEnum.SUCCESS_NO_CONTENT).send();

		return super.getResponse(request, res());
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { token, password } = request.body;

		const resetPasswordService = container.resolve(ResetPasswordService);

		await resetPasswordService.execute({
			token,
			password,
		});

		return super.getResponse(
			request,
			response.status(HTTPStatusCodeEnum.SUCCESS_NO_CONTENT).send(),
		);
	}
}
