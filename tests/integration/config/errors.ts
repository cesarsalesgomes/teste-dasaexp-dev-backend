import { CustomError } from '@src/common/classes/CustomError';

export const TEST_MODULE_ONLY_FOR_TESTS_ERROR = new CustomError(
  'TEST_MODULE_ONLY_FOR_TESTS',
  'Módulo de testes deve ser apenas usado em ambiente de teste'
);
