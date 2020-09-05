import { Status } from '@src/common/enums/Status';
import { IsString, Length, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExamsType } from '../exams.enum';

export default class CreateExamInput {
  @ApiProperty({
    minimum: 1,
    maximum: 256
  })
  @IsString()
  @Length(1, 256)
  name: string

  @ApiProperty({
    enum: ExamsType
  })
  @IsEnum(ExamsType)
  type: ExamsType

  @ApiProperty({
    enum: Status
  })
  @IsEnum(Status)
  status: Status
}
