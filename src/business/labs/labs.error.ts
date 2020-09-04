import { CustomError } from '@src/common/classes/CustomError';

export const CREATE_LAB_ERROR = new CustomError(
  'CREATE_LAB',
  'Erro ao criar laboratório'
);
