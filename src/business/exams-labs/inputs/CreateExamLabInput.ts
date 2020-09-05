import {
  IsInt, IsPositive
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateExamLabInput {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  examId: number

  @ApiProperty()
  @IsInt()
  @IsPositive()
  labId: number
}
