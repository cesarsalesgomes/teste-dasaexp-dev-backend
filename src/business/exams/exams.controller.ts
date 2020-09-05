import {
  Controller, Post, Body, Get, Put, Param, Delete, Query
} from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import CreateExamInput from './inputs/CreateExamInput';
import ExamsEntity from './exams.entity';
import ExamsService from './exams.service';
import UpdateExamInput from './inputs/UpdateExamInput';
import LabsEntity from '../labs/labs.entity';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) { }

  @ApiHeader({ name: 'Criação de exame' })
  @Post()
  async createExam(@Body() input: CreateExamInput): Promise<ExamsEntity> {
    return this.examsService.createExam(input);
  }

  @ApiHeader({ name: 'Criação de exames em lote' })
  @Post('batch')
  async createExams(@Body() input: CreateExamInput[]): Promise<ExamsEntity[]> {
    return this.examsService.createExams(input);
  }

  @ApiHeader({ name: 'Obter lista de exames ativos' })
  @Get()
  async getExams(): Promise<ExamsEntity[]> {
    return this.examsService.getExams();
  }

  @ApiHeader({ name: 'Atualização de um exame por id' })
  @Put(':id')
  async updateExamById(@Param('id') examId: number, @Body() partialExam: UpdateExamInput): Promise<ExamsEntity> {
    return this.examsService.updateExamById(examId, partialExam);
  }

  @ApiHeader({ name: 'Desativação de um exame por id' })
  @Delete(':id')
  async deleteExamById(@Param('id') examId: number): Promise<ExamsEntity> {
    return this.examsService.deleteExamById(examId);
  }

  @ApiHeader({ name: 'Busca por nome do exame com retorno de todos seus laboratorios associados' })
  @Get('labs')
  async getExamByNameAndGetExamLabs(@Query('examName') examName: string): Promise<LabsEntity[]> {
    return this.examsService.getExamByNameAndGetExamLabs(examName);
  }
}
