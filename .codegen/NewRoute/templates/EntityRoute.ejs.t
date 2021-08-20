---
to: src/modules/<%-module%>/routes/<%-h.changeCase.lower(name)%>.routes.ts
force: true
---
import { Router } from 'express';
import { checkAuthentication } from '@shared/routes/middlewares/checkAuthentication';
import { <%-h.changeCase.title(name)%>Controller } from '../controllers/<%-h.changeCase.title(name)%>Controller';

const <%-h.changeCase.lower(name)%>Router = Router();
const <%-h.changeCase.lower(name)%>Controller = new <%-h.changeCase.title(name)%>Controller();

<%-h.changeCase.lower(name)%>Router.post(
  '/',
  checkAuthentication,
  <%-h.changeCase.lower(name)%>Controller.store,
);

export { <%-h.changeCase.lower(name)%>Router };
