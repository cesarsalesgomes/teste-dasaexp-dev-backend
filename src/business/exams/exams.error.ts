import { CustomError } from '@src/common/classes/CustomError';

export const CREATE_EXAM_ERROR = new CustomError(
  'CREATE_EXAM',
  'Erro ao criar exame'
);
