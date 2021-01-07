import BaseController from '@shared/controllers/BaseController';
import { IControllers } from '@shared/controllers/dto/IControllers';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ICreateUserDTO } from '../dto/ICreateUserDTO';
import CreateUserService from '../services/CreateUserService';
import { HTTPStatusCodeEnum } from '@shared/errors/dto/HTTPStatusCodeEnum';

export default class UserController
  extends BaseController
  implements IControllers {
  public async store(request: Request, response: Response): Promise<Response> {
    const userData: ICreateUserDTO = request.body;

    const createUserService = container.resolve(CreateUserService);

    const newUser = await createUserService.execute(userData);

    return super.getResponse(request, response.status(HTTPStatusCodeEnum.SUCCESS).json(newUser));
  }
}
