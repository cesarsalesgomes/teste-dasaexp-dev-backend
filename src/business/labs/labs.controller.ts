import {
  Controller, Post, Body, Get, Put, Param, Delete
} from '@nestjs/common';
import LabsService from './labs.service';
import CreateLabInput from './inputs/CreateLabInput';
import LabsEntity from './labs.entity';
import UpdateLabInput from './inputs/UpdateLabInput';

@Controller('labs')
export class LabsController {
  constructor(private readonly labsService: LabsService) { }

  @Post()
  async createLab(@Body() input: CreateLabInput): Promise<LabsEntity> {
    return this.labsService.createLab(input);
  }

  @Post('batch')
  async createLabs(@Body() input: CreateLabInput[]): Promise<LabsEntity[]> {
    return this.labsService.createLabs(input);
  }

  @Get()
  async getLabs(): Promise<LabsEntity[]> {
    return this.labsService.getLabs();
  }

  @Put(':id')
  async updateLabById(@Param('id') labId: number, @Body() partialLab: UpdateLabInput): Promise<LabsEntity> {
    return this.labsService.updateLabById(labId, partialLab);
  }

  @Delete(':id')
  async deleteLabById(@Param('id') labId: number): Promise<LabsEntity> {
    return this.labsService.deleteLabById(labId);
  }
}
