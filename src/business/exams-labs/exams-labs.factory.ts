import { Injectable } from '@nestjs/common';
import { ExamsLabsEntity } from './exams-labs.entity';
import ExamsEntity from '../exams/exams.entity';
import LabsEntity from '../labs/labs.entity';

@Injectable()
export default class ExamsLabsFactory {
  createExamLab(exam: ExamsEntity, lab: LabsEntity): ExamsLabsEntity {
    const examLab = new ExamsLabsEntity();

    examLab.exam = exam;
    examLab.lab = lab;

    const currentDate = new Date();

    examLab.createdAt = currentDate;
    examLab.updatedAt = currentDate;

    return examLab;
  }
}
