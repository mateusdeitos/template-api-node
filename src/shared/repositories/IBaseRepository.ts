export interface IBaseRepository<G> {
  findByProp(prop: keyof G, value: G[keyof G]): Promise<G | undefined>;
  findAllByProp?(prop: keyof G, value: G[keyof G]): Promise<G[]>;
  updateProp(id: number, prop: keyof G, value: G[keyof G]): Promise<void>;
}
