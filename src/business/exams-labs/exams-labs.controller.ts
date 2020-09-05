import { Controller, Post, Body } from '@nestjs/common';
import CreateExamLabInput from './inputs/CreateExamLabInput';
import { ExamsLabsEntity } from './exams-labs.entity';
import ExamsLabsService from './exams-labs.service';

@Controller('exams-labs')
export class ExamsLabsController {
  constructor(private readonly examsLabsService: ExamsLabsService) { }

  @Post()
  async createExamLab(@Body() input: CreateExamLabInput): Promise<ExamsLabsEntity> {
    return this.examsLabsService.createExamLab(input);
  }
}
