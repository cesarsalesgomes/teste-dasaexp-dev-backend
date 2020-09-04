import { Status } from '@src/common/enums/Status';
import {
  IsString, Length, IsEnum, IsOptional
} from 'class-validator';
import { States } from '../labs.enum';

export default class UpdateLabInput {
  @IsOptional()
  @IsString()
  @Length(1, 256)
  name: string

  @IsOptional()
  @IsString()
  @Length(8, 9)
  postcode: string

  @IsOptional()
  @IsEnum(States)
  state: States

  @IsOptional()
  @IsString()
  @Length(1, 32)
  city: string

  @IsOptional()
  @IsString()
  @Length(1, 128)
  street: string

  @IsOptional()
  @IsString()
  @Length(1, 32)
  number: string

  @IsOptional()
  @IsString()
  @Length(1, 128)
  neighborhood: string

  @IsOptional()
  @IsString()
  @Length(1, 256)
  additionalInfo?: string

  @IsOptional()
  @IsEnum(Status)
  status: Status
}
