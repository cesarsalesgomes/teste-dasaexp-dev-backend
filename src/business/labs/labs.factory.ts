import { Injectable } from '@nestjs/common';
import LabsEntity from './labs.entity';
import CreateLabInput from './inputs/CreateLabInput';

@Injectable()
export default class LabsFactory {
  createLab(input: CreateLabInput): LabsEntity {
    const lab = new LabsEntity();

    lab.name = input.name;
    lab.postcode = input.postcode;
    lab.state = input.state;
    lab.city = input.city;
    lab.street = input.street;
    lab.number = input.number;
    lab.neighborhood = input.neighborhood;
    lab.additionalInfo = input.additionalInfo;
    lab.status = input.status;

    const currentDate = new Date();

    lab.createdAt = currentDate;
    lab.updatedAt = currentDate;

    return lab;
  }
}
