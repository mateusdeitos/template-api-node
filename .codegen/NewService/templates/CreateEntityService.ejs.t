---
to: src/modules/<%-module%>/services/Create<%-h.changeCase.title(name)%>Service.ts
force: true
---
import { <%-h.changeCase.upper(name)%>_REPOSITORY_TOKEN } from '@shared/container';
import ServiceValidationException from '@shared/errors/ServiceValidationException';
import { inject, injectable } from 'tsyringe';
import { ICreate<%-h.changeCase.title(name)%>DTO } from '../dto/ICreate<%-h.changeCase.title(name)%>DTO';
import { <%-h.changeCase.title(name)%> } from '../entities/typeorm/<%-h.changeCase.title(name)%>';
import { I<%-h.changeCase.title(name)%>Repository } from '../repositories/dto/I<%-h.changeCase.title(name)%>Repository';

@injectable()
export class Create<%-h.changeCase.title(name)%>Service {
  constructor(
    @inject(<%-h.changeCase.upper(name)%>_REPOSITORY_TOKEN)
    private <%-h.changeCase.lower(name)%>Repository: I<%-h.changeCase.title(name)%>Repository,
  ) {}

  public async execute(<%-h.changeCase.lower(name)%>: ICreate<%-h.changeCase.title(name)%>DTO): Promise<<%-h.changeCase.title(name)%>> {
    return this.<%-h.changeCase.lower(name)%>Repository.create({ ...<%-h.changeCase.lower(name)%> });
  }
}
