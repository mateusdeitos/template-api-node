import BaseController from '@shared/controllers/BaseController';
import { IControllers } from '@shared/controllers/dto/IControllers';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ICreateUserDTO } from '../dto/ICreateUserDTO';
import CreateUserService from '../services/CreateUserService';
import { IAuthenticateUserDTO } from '../dto/IAuthenticateUserDTO';
import AuthenticateUserService from '../services/AuthenticateUserService';

export default class AuthenticationController
  extends BaseController
  implements IControllers {
  public async store(request: Request, response: Response): Promise<Response> {
    const loginData: IAuthenticateUserDTO = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const responseLogin = await authenticateUserService.execute(loginData);

    return super.getResponse(request, response.status(200).json(responseLogin));
  }
}
