import { Status } from '@src/common/enums/Status';
import CreateLabInput from '@src/business/labs/inputs/CreateLabInput';
import { States } from '@src/business/labs/labs.enum';

export const mockActiveLab: CreateLabInput = {
  name: 'Dasa Laboratório #1',
  postcode: '04734001',
  state: States.SP,
  city: 'São Paulo',
  street: 'Avenida Adolfo Pinheiro',
  number: '1823',
  neighborhood: 'Santo Amaro',
  additionalInfo: 'Ao lado da banca',
  status: Status.ATIVO
};

export const mockNotActiveLab: CreateLabInput = {
  name: 'Dasa Laboratório #2',
  postcode: '04734001',
  state: States.SP,
  city: 'São Paulo',
  street: 'Avenida Adolfo Pinheiro',
  number: '1823',
  neighborhood: 'Santo Amaro',
  additionalInfo: 'Ao lado da banca',
  status: Status.INATIVO
};

export const mockActiveLab2: CreateLabInput = {
  name: 'Dasa Laboratório #3',
  postcode: '37800000',
  state: States.MG,
  city: 'Guaxupé',
  street: 'Rua Ivo Martins',
  number: '170',
  neighborhood: 'Vila Meziara',
  additionalInfo: 'Próximo ao ponto',
  status: Status.ATIVO
};
