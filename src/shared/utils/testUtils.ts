export const getNextIdInArray = (array: { id: number }[]): number =>
  array.length === 0 ? 1 : Math.max(...array.map(obj => obj.id)) + 1;

export const saveEntityInRepository = (
  repository: { id: number }[],
  entity: { id: number },
): void => {
  if (entity.id) {
    const index = repository.findIndex(
      storedEntity => storedEntity.id === entity.id,
    );
    repository.splice(index, 1);
  }
  repository.push({
    ...entity,
    id: entity.id ?? getNextIdInArray(repository),
  });
};

export const findEntityInRepositoryByProp = (
  repository: never[],
  props: { propName: string; propValue: unknown },
): unknown => {
  const { propName, propValue } = props;
  const index = repository.findIndex(entity => {
    if (entity[propName]) {
      return entity[propName] === propValue;
    }
    return false;
  });

  return repository[index];
};
