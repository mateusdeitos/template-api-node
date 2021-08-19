---
to: src/modules/<%-h.changeCase.lower(name)%>/repositories/typeorm/<%-h.changeCase.title(name)%>Repository.ts
force: true
---
import { ICreate<%-h.changeCase.title(name)%>DTO } from '@modules/<%-h.changeCase.lower(name)%>/dto/ICreate<%-h.changeCase.title(name)%>DTO';
import { <%-h.changeCase.title(name)%> } from '@modules/<%-h.changeCase.lower(name)%>/entities/typeorm/<%-h.changeCase.title(name)%>';
import { getRepository, Repository } from 'typeorm';
import { I<%-h.changeCase.title(name)%>Repository } from '../dto/I<%-h.changeCase.title(name)%>Repository';

export class <%-h.changeCase.title(name)%>Repository implements I<%-h.changeCase.title(name)%>Repository {
  private ormRepository: Repository<<%-h.changeCase.title(name)%>>;

  constructor() {
    this.ormRepository = getRepository(<%-h.changeCase.title(name)%>);
  }

  public async create(<%-h.changeCase.lower(name)%>: ICreate<%-h.changeCase.title(name)%>DTO): Promise<<%-h.changeCase.title(name)%>> {
    const new<%-h.changeCase.title(name)%> = this.ormRepository.create(<%-h.changeCase.lower(name)%>);
    return this.ormRepository.save(new<%-h.changeCase.title(name)%>);
  }

  public async findByProp(
    prop: keyof <%-h.changeCase.title(name)%>,
    value: <%-h.changeCase.title(name)%>[keyof <%-h.changeCase.title(name)%>],
  ): Promise<<%-h.changeCase.title(name)%> | undefined> {
    return this.ormRepository.findOne({ where: { [prop]: value } });
  }

  public async updateProp(
    id: number,
    prop: keyof <%-h.changeCase.title(name)%>,
    value: <%-h.changeCase.title(name)%>[keyof <%-h.changeCase.title(name)%>],
  ): Promise<void> {
    await this.ormRepository.update(id, { [prop]: value });
  }
}


