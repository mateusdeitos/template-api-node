---
to: src/shared/routes/index.ts
inject: true
before: import.*from.*'express';
---
import { <%-h.changeCase.lower(name)%>Router } from '@modules/<%-h.changeCase.lower(name)%>/routes/<%-h.changeCase.lower(name)%>.routes';
