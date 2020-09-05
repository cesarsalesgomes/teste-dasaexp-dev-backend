import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from '@src/common/enums/Status';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import LabsEntity from './labs.entity';
import LabsFactory from './labs.factory';
import {
  CREATE_LAB_ERROR, GET_ACTIVE_LABS_ERROR, LAB_NOT_FOUND_ERROR, LAB_UPDATE_ERROR,
  LAB_DELETE_ERROR, CREATE_LABS_ERROR, LAB_DEACTIVATED_ERROR
} from './labs.error';
import CreateLabInput from './inputs/CreateLabInput';

@Injectable()
export default class LabsService {
  constructor(
    @InjectRepository(LabsEntity)
    private labsRepository: Repository<LabsEntity>,
    private labsFactory: LabsFactory
  ) { }

  async createLab(input: CreateLabInput): Promise<LabsEntity> {
    try {
      return await this.labsRepository.save(this.labsFactory.createLab(input));
    } catch (error) {
      throw CREATE_LAB_ERROR;
    }
  }

  async createLabs(inputs: CreateLabInput[]): Promise<LabsEntity[]> {
    try {
      return await this.labsRepository.save(inputs.map((lab) => this.labsFactory.createLab(lab)));
    } catch (error) {
      throw CREATE_LABS_ERROR;
    }
  }

  async getLabs(): Promise<LabsEntity[]> {
    try {
      return await this.labsRepository.find({ where: { status: Status.ATIVO } });
    } catch (error) {
      throw GET_ACTIVE_LABS_ERROR;
    }
  }

  async getLabById(labId: number): Promise<LabsEntity> {
    try {
      return await this.labsRepository.findOneOrFail(labId);
    } catch (error) {
      throw LAB_NOT_FOUND_ERROR;
    }
  }

  async getLabByIdAndCheckIfItsDeactivated(labId: number): Promise<LabsEntity> {
    const lab = await this.getLabById(labId);

    if (lab.status !== Status.ATIVO) throw LAB_DEACTIVATED_ERROR;

    return lab;
  }

  async updateLab(lab: LabsEntity, partialLab: QueryDeepPartialEntity<LabsEntity>): Promise<LabsEntity> {
    try {
      const updatedAt = new Date();

      await this.labsRepository.update(lab.id, { ...partialLab, updatedAt });

      return { ...lab, ...partialLab } as LabsEntity;
    } catch (error) {
      throw LAB_UPDATE_ERROR;
    }
  }

  async updateLabById(labId: number, partialLab: QueryDeepPartialEntity<LabsEntity>): Promise<LabsEntity> {
    const lab = await this.getLabById(labId);

    return this.updateLab(lab, partialLab);
  }

  async deleteLabById(labId: number): Promise<LabsEntity> {
    const lab = await this.getLabById(labId);

    try {
      return this.updateLab(lab, { status: Status.INATIVO });
    } catch (error) {
      throw LAB_DELETE_ERROR;
    }
  }
}
