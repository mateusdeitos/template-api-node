---
to: src/shared/container/index.ts
inject: true
append: true
---
export const <%-h.changeCase.upper(name)%>_REPOSITORY_TOKEN = '<%-h.changeCase.title(name)%>Repository';
container.registerSingleton<I<%-h.changeCase.title(name)%>Repository>(
  <%-h.changeCase.upper(name)%>_REPOSITORY_TOKEN,
  <%-h.changeCase.title(name)%>Repository,
);
