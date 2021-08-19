---
to: src/shared/routes/index.ts
inject: true
before: export.*routes;
---
routes.use('/v1/<%-h.inflection.pluralize(h.changeCase.lower(name))%>', <%-h.changeCase.lower(name)%>Router);
