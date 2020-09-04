import { CustomError } from '@src/common/classes/CustomError';

export const CREATE_EXAM_ERROR = new CustomError(
  'CREATE_EXAM',
  'Erro ao criar exame'
);

export const GET_ACTIVE_EXAMS_ERROR = new CustomError(
  'GET_ACTIVE_EXAMS',
  'Erro ao buscar exames ativos'
);
