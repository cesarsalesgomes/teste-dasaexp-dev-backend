import { CustomError } from '@src/common/classes/CustomError';

export const CREATE_LAB_ERROR = new CustomError(
  'CREATE_LAB',
  'Erro ao criar laboratório'
);

export const GET_ACTIVE_LABS_ERROR = new CustomError(
  'GET_ACTIVE_LABS',
  'Erro ao buscar laboratórios ativos'
);

export const LAB_NOT_FOUND_ERROR = new CustomError(
  'LAB_NOT_FOUND',
  'Laboratório não encontrado'
);

export const LAB_UPDATE_ERROR = new CustomError(
  'LAB_UPDATE',
  'Erro ao atualizar laboratório'
);

export const LAB_DELETE_ERROR = new CustomError(
  'LAB_DELETE',
  'Erro ao desativar laboratório'
);

export const CREATE_LABS_ERROR = new CustomError(
  'CREATE_LABS',
  'Erro ao criar laboratório em lote'
);

export const LAB_DEACTIVATED_ERROR = new CustomError(
  'LAB_DEACTIVATED',
  'Laboratório desativado'
);
