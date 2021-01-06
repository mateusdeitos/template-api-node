import BaseController from '@shared/controllers/BaseController';
import { IControllers } from '@shared/controllers/dto/IControllers';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ICreateUserDTO } from '../dto/ICreateUserDTO';
import CreateUserService from '../services/CreateUserService';

export default class UserController
  extends BaseController
  implements IControllers {
  public async store(request: Request, response: Response): Promise<Response> {
    const userData: ICreateUserDTO = request.body;

    const createUserService = container.resolve(CreateUserService);

    const newUser = await createUserService.executa(userData);

    this.setResponseStatus(200);
    this.setResponseBody(newUser);

    return this.getResponse(response);
  }
}
