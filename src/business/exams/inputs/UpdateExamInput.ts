import { Status } from '@src/common/enums/Status';
import {
  IsString, Length, IsEnum, IsOptional
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExamsType } from '../exams.enum';

export default class UpdateExamInput {
  @ApiProperty({
    minimum: 1,
    maximum: 256,
    required: false
  })
  @IsOptional()
  @IsString()
  @Length(1, 256)
  name: string

  @ApiProperty({
    required: false,
    enum: ExamsType
  })
  @IsOptional()
  @IsEnum(ExamsType)
  type: ExamsType

  @ApiProperty({
    required: false,
    enum: Status
  })
  @IsOptional()
  @IsEnum(Status)
  status: Status
}
