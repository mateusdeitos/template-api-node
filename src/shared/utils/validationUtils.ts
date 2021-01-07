export const throwIf = async <E, T, D>(
  props: {
    test: Promise<T>;
    statusCode?: number;
    message: string;
    data?: D;
    Exception: {
      new (message: string, statusCode?: number, data?: D): E;
    };
  },
  condition = true,
): Promise<void> => {
  const { statusCode, message, data, test, Exception } = props;
  try {
    const testResult = await test;

    if (!!testResult === condition) {
      throw new Exception(message, statusCode, data);
    }
  } catch (error) {
    if (error instanceof Exception) {
      throw error;
    }

    throw new Error(error.message);
  }
};

export const throwIfSome = async <E, T, D>(
  props: {
    test: Promise<T>;
    statusCode?: number;
    message: string;
    data?: D;
  }[],
  Exception: {
    new (message: string, statusCode?: number, data?: D): E;
  },
  condition = true,
): Promise<void> => {
  try {
    await Promise.all(
      props.map(async ({ message, statusCode, data, test }) =>
        throwIf({ message, statusCode, data, test, Exception }, condition),
      ),
    );
  } catch (error) {
    if (error instanceof Exception) {
      throw error;
    }

    throw new Error(error.message);
  }
};
