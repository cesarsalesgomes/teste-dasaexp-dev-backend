import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import LabsEntity from './labs.entity';
import LabsFactory from './labs.factory';
import { CREATE_LAB_ERROR } from './labs.error';
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
}
