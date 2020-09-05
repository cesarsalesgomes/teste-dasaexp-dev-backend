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

export const EXAM_DELETE_ERROR = new CustomError(
  'EXAM_DELETE',
  'Erro ao desativar exame'
);

export const GET_EXAM_LABS_ERROR = new CustomError(
  'GET_EXAM_LABS',
  'Erro ao buscar laboratórios associados a um exame'
);

export const CREATE_EXAMS_ERROR = new CustomError(
  'CREATE_EXAMS',
  'Erro ao criar exames em lote'
);
