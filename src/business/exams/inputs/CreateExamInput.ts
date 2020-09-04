import { Status } from '@src/common/enums/Status';
import { IsString, Length, IsEnum } from 'class-validator';
import { ExamsType } from '../exams.enum';

export default class CreateExamInput {
  @IsString()
  @Length(1, 256)
  name: string

  @IsEnum(ExamsType)
  type: ExamsType

  @IsEnum(Status)
  status: Status
}
