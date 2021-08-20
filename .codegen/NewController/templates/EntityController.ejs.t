---
to: src/modules/<%-module%>/controllers/<%-h.changeCase.title(name)%>Controller.ts
force: true
---
import BaseController from '@shared/controllers/BaseController';
import { IControllers } from '@shared/controllers/dto/IControllers';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { HTTPStatusCodeEnum } from '@shared/errors/dto/HTTPStatusCodeEnum';
import { classToClass } from 'class-transformer';
import { ICreate<%-h.changeCase.title(name)%>DTO } from '../dto/ICreate<%-h.changeCase.title(name)%>DTO';
import { Create<%-h.changeCase.title(name)%>Service } from '../services/Create<%-h.changeCase.title(name)%>Service';

export class <%-h.changeCase.title(name)%>Controller
  extends BaseController
  implements IControllers {
  public async store(request: Request, response: Response): Promise<Response> {
    const <%-h.changeCase.lower(name)%>Data: ICreate<%-h.changeCase.title(name)%>DTO = request.body;

    const create<%-h.changeCase.title(name)%>Service = container.resolve(Create<%-h.changeCase.title(name)%>Service);

    const new<%-h.changeCase.title(name)%> = await create<%-h.changeCase.title(name)%>Service.execute(<%-h.changeCase.lower(name)%>Data);

    return super.getResponse(
      request,
      response.status(HTTPStatusCodeEnum.SUCCESS).json(classToClass(new<%-h.changeCase.title(name)%>)),
    );
  }
}
