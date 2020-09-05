import { Status } from '@src/common/enums/Status';
import {
  IsString, Length, IsEnum, IsOptional
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { States } from '../labs.enum';

export default class UpdateLabInput {
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
    minimum: 8,
    maximum: 9,
    required: false
  })
  @IsOptional()
  @IsString()
  @Length(8, 9)
  postcode: string

  @ApiProperty({
    required: false,
    enum: States
  })
  @IsOptional()
  @IsEnum(States)
  state: States

  @ApiProperty({
    minimum: 1,
    maximum: 32,
    required: false
  })
  @IsOptional()
  @IsString()
  @Length(1, 32)
  city: string

  @ApiProperty({
    minimum: 1,
    maximum: 128,
    required: false
  })
  @IsOptional()
  @IsString()
  @Length(1, 128)
  street: string

  @ApiProperty({
    minimum: 1,
    maximum: 32,
    required: false
  })
  @IsOptional()
  @IsString()
  @Length(1, 32)
  number: string

  @ApiProperty({
    minimum: 1,
    maximum: 128,
    required: false
  })
  @IsOptional()
  @IsString()
  @Length(1, 128)
  neighborhood: string

  @ApiProperty({
    minimum: 1,
    maximum: 256,
    required: false
  })
  @IsOptional()
  @IsString()
  @Length(1, 256)
  additionalInfo?: string

  @ApiProperty({
    required: false,
    enum: Status
  })
  @IsOptional()
  @IsEnum(Status)
  status: Status
}
