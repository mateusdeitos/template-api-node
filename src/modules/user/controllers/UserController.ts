import BaseController from '@shared/controllers/BaseController';
import { IControllers } from '@shared/controllers/dto/IControllers';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { HTTPStatusCodeEnum } from '@shared/errors/dto/HTTPStatusCodeEnum';
import { classToClass } from 'class-transformer';
import SendMailService from '@shared/services/SendMailService';
import path from 'path';
import CreateUserTokenService from '@modules/userTokens/services/CreateUserTokenService';
import { v4 } from 'uuid';
import { ICreateUserDTO } from '../dto/ICreateUserDTO';
import CreateUserService from '../services/CreateUserService';

export default class UserController
	extends BaseController
	implements IControllers
{
	public async store(request: Request, response: Response): Promise<Response> {
		const userData: ICreateUserDTO = request.body;

		const createUserService = container.resolve(CreateUserService);

		const newUser = await createUserService.execute(userData);

		const sendMailService = container.resolve(SendMailService);

		const createActivationTokenService = container.resolve(
			CreateUserTokenService,
		);

		const activationToken = await createActivationTokenService.execute({
			id_user: newUser.id,
			token: v4(),
		});

		await sendMailService.execute({
			to: {
				email: newUser.email,
				name: newUser.nome,
			},
			from: {
				email: 'myteam@team.com',
				name: 'My Team',
			},
			subject: 'Active your account',
			template: {
				file: path.resolve(
					__dirname,
					'..',
					'templates',
					'mail_activate_user.hbs',
				),
				variables: {
					name: newUser.nome,
					// This should be the url of the web app
					url: `${process.env.FRONTEND_URL}/activate?token=${activationToken}`,
				},
			},
		});

		return super.getResponse(
			request,
			response.status(HTTPStatusCodeEnum.SUCCESS).json(classToClass(newUser)),
		);
	}
}
