import {
  Controller, Post, Body, Get, Put, Param, Delete, Query
} from '@nestjs/common';
import CreateExamInput from './inputs/CreateExamInput';
import ExamsEntity from './exams.entity';
import ExamsService from './exams.service';
import UpdateExamInput from './inputs/UpdateExamInput';
import LabsEntity from '../labs/labs.entity';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) { }

  @Post()
  async createExam(@Body() input: CreateExamInput): Promise<ExamsEntity> {
    return this.examsService.createExam(input);
  }

  @Get()
  async getExams(): Promise<ExamsEntity[]> {
    return this.examsService.getExams();
  }

  @Put(':id')
  async updateExamById(@Param('id') examId: number, @Body() partialExam: UpdateExamInput): Promise<ExamsEntity> {
    return this.examsService.updateExamById(examId, partialExam);
  }

  @Delete(':id')
  async deleteExamById(@Param('id') examId: number): Promise<ExamsEntity> {
    return this.examsService.deleteExamById(examId);
  }

  @Get('labs')
  async getExamByNameAndGetExamLabs(@Query('examName') examName: string): Promise<LabsEntity[]> {
    return this.examsService.getExamByNameAndGetExamLabs(examName);
  }
}
