---
to: src/shared/container/index.ts
inject: true
after: import.*from.*'tsyringe';
---
import { I<%-h.changeCase.title(name)%>Repository } from '@modules/<%-h.changeCase.lower(name)%>/repositories/dto/I<%-h.changeCase.title(name)%>Repository';
import { <%-h.changeCase.title(name)%>Repository } from '@modules/<%-h.changeCase.lower(name)%>/repositories/typeorm/<%-h.changeCase.title(name)%>Repository';
