---
to: src/modules/<%-module%>/repositories/dto/I<%-h.changeCase.title(name)%>Repository.ts
force: true
---
import { ICreate<%-h.changeCase.title(name)%>DTO } from '@modules/<%-h.changeCase.lower(name)%>/dto/ICreate<%-h.changeCase.title(name)%>DTO';
import { <%-h.changeCase.title(name)%> } from '@modules/<%-h.changeCase.lower(name)%>/entities/typeorm/<%-h.changeCase.title(name)%>';
import { IBaseRepository } from '@shared/repositories/IBaseRepository';

export interface I<%-h.changeCase.title(name)%>Repository extends IBaseRepository<<%-h.changeCase.title(name)%>> {
  create(<%-h.changeCase.lower(name)%>: ICreate<%-h.changeCase.title(name)%>DTO): Promise<<%-h.changeCase.title(name)%>>;
}

