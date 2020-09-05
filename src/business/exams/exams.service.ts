import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from '@src/common/enums/Status';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import {
  CREATE_EXAM_ERROR, GET_ACTIVE_EXAMS_ERROR, EXAM_NOT_FOUND_ERROR,
  EXAM_UPDATE_ERROR, EXAM_DELETE_ERROR, GET_EXAM_LABS_ERROR, CREATE_EXAMS_ERROR,
  EXAM_DEACTIVATED_ERROR
} from './exams.error';
import ExamsFactory from './exams.factory';
import CreateExamInput from './inputs/CreateExamInput';
import ExamsEntity from './exams.entity';
import { ExamsRelations } from './exams.enum';
import LabsEntity from '../labs/labs.entity';

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

  async createExams(inputs: CreateExamInput[]): Promise<ExamsEntity[]> {
    try {
      return await this.examsRepository.save(inputs.map((input) => this.examsFactory.createExam(input)));
    } catch (error) {
      throw CREATE_EXAMS_ERROR;
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

  async getExamByIdAndCheckIfItsActivated(examId: number): Promise<ExamsEntity> {
    const exam = await this.getExamById(examId);

    if (exam.status !== Status.ATIVO) throw EXAM_DEACTIVATED_ERROR;

    return exam;
  }

  async getExamByName(name: string, relations: ExamsRelations[]): Promise<ExamsEntity> {
    try {
      return await this.examsRepository.findOneOrFail({ where: { name }, relations });
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

  async deleteExamById(examId: number): Promise<ExamsEntity> {
    const exam = await this.getExamById(examId);

    try {
      return this.updateExam(exam, { status: Status.INATIVO });
    } catch (error) {
      throw EXAM_DELETE_ERROR;
    }
  }

  async getExamByNameAndGetExamLabs(examName: string): Promise<LabsEntity[]> {
    const { examsLabs } = await this.getExamByName(examName, [ExamsRelations.examsLabs, ExamsRelations.examsLabsLab]);

    try {
      return examsLabs.map(({ lab }) => lab);
    } catch (error) {
      throw GET_EXAM_LABS_ERROR;
    }
  }
}
