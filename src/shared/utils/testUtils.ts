type idRequired = { id: number };
export const getNextIdInArray = <T extends idRequired>(array: T[]): number =>
  array.length === 0 ? 1 : Math.max(...array.map(obj => obj.id)) + 1;

export const saveObjectInRepository = <T extends idRequired>(
  repository: T[],
  object: T,
): T => {
  const { id } = object;
  if (id) {
    const index = repository.findIndex(storedObject => storedObject.id === id);
    repository.splice(index, 1);
  }
  const newObject = {
    ...object,
    id: id ?? getNextIdInArray(repository),
  };
  repository.push(newObject);

  return newObject;
};

export const findEntityInRepositoryByProp = <T>(
  repository: T[],
  props: { propName: keyof T; propValue: T[keyof T] },
): T | undefined => {
  const { propName, propValue } = props;
  return repository.find(entity => entity[propName] === propValue);
};

export const removeEntityFromRepository = <T extends idRequired>(
  repository: T[],
  entity: T,
): void => {
  const { id } = entity;
  if (id) {
    const index = repository.findIndex(obj => obj.id === id);
    repository.splice(index, 1);
  }
};
