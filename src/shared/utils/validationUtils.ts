import ServiceValidationException from '@shared/errors/ServiceValidationException';

export const throwServiceValidationExceptionIfTrue = async (props: {
  criteria: unknown;
  statusCode?: number;
  message: string;
  data?: unknown;
}): Promise<void> => {
  const { statusCode, message, data, criteria } = props;
  const test = await criteria;
  if (test) {
    throw new ServiceValidationException(message, statusCode, data);
  }
};
