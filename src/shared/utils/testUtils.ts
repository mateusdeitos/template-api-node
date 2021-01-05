export const getNextIdInArray = (array: { id: number; }[]) => (
    array.length === 0 ? 1 : Math.max(...array.map(obj => obj.id)) + 1
);

export const saveEntityInRepository = (repository: { id: number; }[], entity: { id: number; }) => {
    if (entity.id) {
        const index = repository.findIndex((storedEntity) => storedEntity.id === entity.id);
        repository.splice(index, 1);
    }
    repository.push({
        ...entity,
        id: entity.id ?? getNextIdInArray(repository),
    });
}

export const findEntityInRepositoryByProp = (repository: any[], props: { propName: string; propValue: unknown }) => {
    const { propName, propValue } = props;
    const index = repository.findIndex((entity) => {
        if (entity[propName]) {
            return entity[propName] === propValue;
        }
        return false;
    });

    return repository[index];
}