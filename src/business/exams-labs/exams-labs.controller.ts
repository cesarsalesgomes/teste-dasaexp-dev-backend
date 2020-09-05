import {
  Controller, Post, Body, Param, Delete
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ApiHeader } from '@nestjs/swagger';
import CreateExamLabInput from './inputs/CreateExamLabInput';
import { ExamsLabsEntity } from './exams-labs.entity';
import ExamsLabsService from './exams-labs.service';

@Controller('exams-labs')
export class ExamsLabsController {
  constructor(private readonly examsLabsService: ExamsLabsService) { }

  @ApiHeader({ name: 'Associa um exame ativo a um laboratório ativo' })
  @Post()
  async createExamLab(@Body() input: CreateExamLabInput): Promise<ExamsLabsEntity> {
    return this.examsLabsService.createExamLab(input);
  }

  @ApiHeader({ name: 'Desassocia um exame ativo a um laboratório ativo' })
  @Delete(':id')
  async deleteExamLab(@Param('id') examLabId: number): Promise<DeleteResult> {
    return this.examsLabsService.deleteExamLab(examLabId);
  }
}
