---
to: src/modules/<%-h.changeCase.lower(name)%>/dto/ICreate<%-h.changeCase.title(name)%>DTO.ts
force: true
---
import { <%-h.changeCase.title(name)%> } from '../entities/typeorm/<%-h.changeCase.title(name)%>';

export type ICreate<%-h.changeCase.title(name)%>DTO = Omit<<%-h.changeCase.title(name)%>, 'id' | 'created_at' | 'updated_at'>;

