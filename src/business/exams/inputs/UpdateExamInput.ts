import { Status } from '@src/common/enums/Status';
import {
  IsString, Length, IsEnum, IsOptional
} from 'class-validator';
import { ExamsType } from '../exams.enum';

export default class UpdateExamInput {
  @IsOptional()
  @IsString()
  @Length(1, 256)
  name: string

  @IsOptional()
  @IsEnum(ExamsType)
  type: ExamsType

  @IsOptional()
  @IsEnum(Status)
  status: Status
}
