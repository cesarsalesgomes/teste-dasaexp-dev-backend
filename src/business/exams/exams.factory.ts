import { Injectable } from '@nestjs/common';
import ExamsEntity from './exams.entity';
import CreateExamInput from './inputs/CreateExamInput';

@Injectable()
export default class ExamsFactory {
  createExam(input: CreateExamInput): ExamsEntity {
    const exam = new ExamsEntity();

    exam.name = input.name;
    exam.type = input.type;
    exam.status = input.status;

    const currentDate = new Date();

    exam.createdAt = currentDate;
    exam.updatedAt = currentDate;

    return exam;
  }
}
