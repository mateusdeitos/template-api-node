---
to: src/modules/<%-module%>/services/tests/Create<%-h.changeCase.title(name)%>Service.spec.ts
force: true
---
import { <%-h.changeCase.title(name)%> } from '@modules/<%-h.changeCase.lower(name)%>/entities/typeorm/<%-h.changeCase.title(name)%>';
import ServiceValidationException from '@shared/errors/ServiceValidationException';
import { Fake<%-h.changeCase.title(name)%>Repository } from '../../repositories/fakes/Fake<%-h.changeCase.title(name)%>Repository';
import { Create<%-h.changeCase.title(name)%>Service } from '../Create<%-h.changeCase.title(name)%>Service';

describe('Criação de <%-h.inflection.pluralize(name)%>', () => {
  let fake<%-h.changeCase.title(name)%>Repository: Fake<%-h.changeCase.title(name)%>Repository;
  let create<%-h.changeCase.title(name)%>Service: Create<%-h.changeCase.title(name)%>Service;

  beforeEach(async () => {
    fake<%-h.changeCase.title(name)%>Repository = new Fake<%-h.changeCase.title(name)%>Repository();
    create<%-h.changeCase.title(name)%>Service = new Create<%-h.changeCase.title(name)%>Service(
      fake<%-h.changeCase.title(name)%>Repository,
    );
  });

  it('Deve poder criar um <%-h.changeCase.lower(name)%>', async () => {
    const <%-h.changeCase.lower(name)%> = await create<%-h.changeCase.title(name)%>Service.execute({
      ...new <%-h.changeCase.title(name)%>(),
    });
    expect(<%-h.changeCase.lower(name)%>).toBeDefined();
    expect(<%-h.changeCase.lower(name)%>.id).toBe(1);
  });
});
