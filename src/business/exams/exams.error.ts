import { CustomError } from '@src/common/classes/CustomError';

export const CREATE_EXAM_ERROR = new CustomError(
  'CREATE_EXAM',
  'Erro ao criar exame'
);

export const GET_ACTIVE_EXAMS_ERROR = new CustomError(
  'GET_ACTIVE_EXAMS',
  'Erro ao buscar exames ativos'
);

export const EXAM_NOT_FOUND_ERROR = new CustomError(
  'EXAM_NOT_FOUND',
  'Exame não encontrado'
);

export const EXAM_UPDATE_ERROR = new CustomError(
  'EXAM_UPDATE',
  'Erro ao atualizar exame'
);
