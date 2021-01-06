/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const getNextIdInArray = (array: any[]): number =>
  array.length === 0 ? 1 : Math.max(...array.map(obj => obj.id)) + 1;

export const saveEntityInRepository = (repository: any[], entity: any): any => {
  if (entity.id) {
    const index = repository.findIndex(
      storedEntity => storedEntity.id === entity.id,
    );
    repository.splice(index, 1);
  }
  const newEntity = {
    ...entity,
    id: entity.id ?? getNextIdInArray(repository),
  };
  repository.push(newEntity);

  return newEntity;
};

export const findEntityInRepositoryByProp = (
  repository: any[],
  props: { propName: string; propValue: unknown },
): any => {
  const { propName, propValue } = props;
  const index = repository.findIndex(entity => {
    if (entity[propName]) {
      return entity[propName] === propValue;
    }
    return false;
  });

  return repository[index];
};
