import { CustomError } from '@src/common/classes/CustomError';

export const CREATE_EXAM_LAB_ERROR = new CustomError(
  'CREATE_EXAM_LAB',
  'Erro ao criar exame associado a um laboratório'
);

export const DUPLICATE_EXAM_LAB_ERROR = new CustomError(
  'DUPLICATE_EXAM_LAB',
  'Exame já está associado ao laboratório informado'
);

export const DELETE_EXAM_LAB_ERROR = new CustomError(
  'DELETE_EXAM_LAB',
  'Erro ao remover associação do exame de um laboratório'
);
