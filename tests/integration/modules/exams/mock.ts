import CreateExamInput from '@src/business/exams/inputs/CreateExamInput';
import { Status } from '@src/common/enums/Status';
import { ExamsType } from '@src/business/exams/exams.enum';

export const mockActiveExam: CreateExamInput = {
  name: 'Exame #1',
  type: ExamsType.ANALISE_CLINICA,
  status: Status.ATIVO
};

export const mockNotActiveExam: CreateExamInput = {
  name: 'Exame #2',
  type: ExamsType.IMAGEM,
  status: Status.INATIVO
};

export const mockActiveExam2: CreateExamInput = {
  name: 'Exame #2',
  type: ExamsType.IMAGEM,
  status: Status.ATIVO
};
