import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from '@src/common/enums/Status';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import {
  CREATE_EXAM_ERROR, GET_ACTIVE_EXAMS_ERROR, EXAM_NOT_FOUND_ERROR, EXAM_UPDATE_ERROR
} from './exams.error';
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

  async getExamById(examId: number): Promise<ExamsEntity> {
    try {
      return await this.examsRepository.findOneOrFail(examId);
    } catch (error) {
      throw EXAM_NOT_FOUND_ERROR;
    }
  }

  async updateExam(exam: ExamsEntity, partialExam: QueryDeepPartialEntity<ExamsEntity>): Promise<ExamsEntity> {
    try {
      const updatedAt = new Date();

      await this.examsRepository.update(exam.id, { ...partialExam, updatedAt });

      return { ...exam, ...partialExam } as ExamsEntity;
    } catch (error) {
      throw EXAM_UPDATE_ERROR;
    }
  }

  async updateExamById(examId: number, partialExam: QueryDeepPartialEntity<ExamsEntity>): Promise<ExamsEntity> {
    const exam = await this.getExamById(examId);

    return this.updateExam(exam, partialExam);
  }
}
