import {
  Controller, Post, Body, Get
} from '@nestjs/common';
import CreateExamInput from './inputs/CreateExamInput';
import ExamsEntity from './exams.entity';
import ExamsService from './exams.service';

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
}
