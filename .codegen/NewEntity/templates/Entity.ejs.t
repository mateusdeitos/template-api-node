---
to: src/modules/<%-module%>/entities/typeorm/<%-h.changeCase.title(name)%>.ts
force: true
---
<%-imports%>

@Entity('<%-h.changeCase.lower(name)%>')
export class <%-h.changeCase.title(name)%> {
<%-fields%>

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

