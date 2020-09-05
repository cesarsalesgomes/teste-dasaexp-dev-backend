import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { DUPLICATE_KEY_ERROR } from '@src/common/constants/constants';
import { CREATE_EXAM_LAB_ERROR, DUPLICATE_EXAM_LAB_ERROR, DELETE_EXAM_LAB_ERROR } from './exams-labs.error';
import { ExamsLabsEntity } from './exams-labs.entity';
import CreateExamLabInput from './inputs/CreateExamLabInput';
import ExamsService from '../exams/exams.service';
import LabsService from '../labs/labs.service';
import ExamsLabsFactory from './exams-labs.factory';

@Injectable()
export default class ExamsLabsService {
  constructor(
    @InjectRepository(ExamsLabsEntity)
    private examslLabsRepository: Repository<ExamsLabsEntity>,
    private examsService: ExamsService,
    private labsService: LabsService,
    private examsLabsFactory: ExamsLabsFactory
  ) { }

  async createExamLab({ examId, labId }: CreateExamLabInput): Promise<ExamsLabsEntity> {
    const exam = await this.examsService.getExamByIdAndCheckIfItsActivated(examId);
    const lab = await this.labsService.getLabByIdAndCheckIfItsDeactivated(labId);

    try {
      return await this.examslLabsRepository.save(this.examsLabsFactory.createExamLab(exam, lab));
    } catch (error) {
      if (error.code === DUPLICATE_KEY_ERROR) {
        throw DUPLICATE_EXAM_LAB_ERROR;
      }

      throw CREATE_EXAM_LAB_ERROR;
    }
  }

  async deleteExamLab(examLabId: number): Promise<DeleteResult> {
    try {
      return await this.examslLabsRepository.delete(examLabId);
    } catch (error) {
      throw DELETE_EXAM_LAB_ERROR;
    }
  }
}
