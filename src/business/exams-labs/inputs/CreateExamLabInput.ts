import {
  IsInt, IsPositive
} from 'class-validator';

export default class CreateExamLabInput {
  @IsInt()
  @IsPositive()
  examId: number

  @IsInt()
  @IsPositive()
  labId: number
}
