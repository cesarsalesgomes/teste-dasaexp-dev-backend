import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from '@src/common/enums/Status';
import { CREATE_EXAM_ERROR, GET_ACTIVE_EXAMS_ERROR } from './exams.error';
import ExamsFactory from './exams.factory';
import CreateExamInput from './inputs/CreateExamInput';
import ExamsEntity from './exams.entity';

@Injectable()
export default class ExamsService {
  constructor(
    @InjectRepository(ExamsEntity)
    private examsRepository: Repository<ExamsEntity>,
    private examsFactory: ExamsFactory
  ) { }

  async createExam(input: CreateExamInput): Promise<ExamsEntity> {
    try {
      return await this.examsRepository.save(this.examsFactory.createExam(input));
    } catch (error) {
      throw CREATE_EXAM_ERROR;
    }
  }

  async getExams(): Promise<ExamsEntity[]> {
    try {
      return await this.examsRepository.find({ where: { status: Status.ATIVO } });
    } catch (error) {
      throw GET_ACTIVE_EXAMS_ERROR;
    }
  }
}
