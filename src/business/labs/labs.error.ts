import { CustomError } from '@src/common/classes/CustomError';

export const CREATE_LAB_ERROR = new CustomError(
  'CREATE_LAB',
  'Erro ao criar laboratório'
);

export const GET_ACTIVE_LABS_ERROR = new CustomError(
  'GET_ACTIVE_LABS',
  'Erro ao buscar laboratórios ativos'
);
