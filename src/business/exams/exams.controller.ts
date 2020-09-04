import { Controller, Post, Body } from '@nestjs/common';
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
}
