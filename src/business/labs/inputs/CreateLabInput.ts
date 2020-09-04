import { Status } from '@src/common/enums/Status';
import {
  IsString, Length, IsEnum, IsOptional
} from 'class-validator';
import { States } from '../labs.enum';

export default class CreateLabInput {
  @IsString()
  @Length(1, 256)
  name: string

  @IsString()
  @Length(8, 9)
  postcode: string

  @IsEnum(States)
  state: States

  @IsString()
  @Length(1, 32)
  city: string

  @IsString()
  @Length(1, 128)
  street: string

  @IsString()
  @Length(1, 32)
  number: string

  @IsString()
  @Length(1, 128)
  neighborhood: string

  @IsOptional()
  @IsString()
  @Length(1, 256)
  additionalInfo?: string

  @IsEnum(Status)
  status: Status
}
