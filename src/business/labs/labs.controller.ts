import {
  Controller, Post, Body, Get
} from '@nestjs/common';
import LabsService from './labs.service';
import CreateLabInput from './inputs/CreateLabInput';
import LabsEntity from './labs.entity';

@Controller('labs')
export class LabsController {
  constructor(private readonly labsService: LabsService) { }

  @Post()
  async createLab(@Body() input: CreateLabInput): Promise<LabsEntity> {
    return this.labsService.createLab(input);
  }

  @Get()
  async getLabs(): Promise<LabsEntity[]> {
    return this.labsService.getLabs();
  }
}
