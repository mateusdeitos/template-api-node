---
to: src/modules/<%-h.changeCase.lower(name)%>/repositories/fakes/Fake<%-h.changeCase.title(name)%>Repository.ts
force: true
---
import { ICreate<%-h.changeCase.title(name)%>DTO } from '@modules/<%-h.changeCase.lower(name)%>/dto/ICreate<%-h.changeCase.title(name)%>DTO';
import { <%-h.changeCase.title(name)%> } from '@modules/<%-h.changeCase.lower(name)%>/entities/typeorm/<%-h.changeCase.title(name)%>';
import {
  saveObjectInRepository,
  findEntityInRepositoryByProp,
} from '@shared/utils/testUtils';
import { I<%-h.changeCase.title(name)%>Repository } from '../dto/I<%-h.changeCase.title(name)%>Repository';

export class Fake<%-h.changeCase.title(name)%>Repository implements I<%-h.changeCase.title(name)%>Repository {
  private ormRepository: <%-h.changeCase.title(name)%>[];

  constructor() {
    this.ormRepository = [];
  }

  public async create(<%-h.changeCase.lower(name)%>: ICreate<%-h.changeCase.title(name)%>DTO): Promise<<%-h.changeCase.title(name)%>> {
    const new<%-h.changeCase.title(name)%> = {
      ...new <%-h.changeCase.title(name)%>(),
      ...<%-h.changeCase.lower(name)%>,
      created_at: new Date(),
      updated_at: new Date(),
    };
    return saveObjectInRepository(this.ormRepository, new<%-h.changeCase.title(name)%>);
  }

  public async findByProp(
    prop: keyof <%-h.changeCase.title(name)%>,
    value: <%-h.changeCase.title(name)%>[keyof <%-h.changeCase.title(name)%>],
  ): Promise<<%-h.changeCase.title(name)%> | undefined> {
    return findEntityInRepositoryByProp(this.ormRepository, {
      propName: prop,
      propValue: value,
    });
  }

  public async updateProp(
    id: number,
    prop: keyof <%-h.changeCase.title(name)%>,
    value: <%-h.changeCase.title(name)%>[keyof <%-h.changeCase.title(name)%>],
  ): Promise<void> {
    const index = this.ormRepository.findIndex(u => u.id === id);
    if (index >= 0) {
      this.ormRepository[index] = {
        ...this.ormRepository[index],
        [prop]: value,
      };
    }
  }
}
