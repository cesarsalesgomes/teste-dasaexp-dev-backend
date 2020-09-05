import {
  Controller, Post, Body, Get, Put, Param, Delete
} from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import LabsService from './labs.service';
import CreateLabInput from './inputs/CreateLabInput';
import LabsEntity from './labs.entity';
import UpdateLabInput from './inputs/UpdateLabInput';

@Controller('labs')
export class LabsController {
  constructor(private readonly labsService: LabsService) { }

  @ApiHeader({ name: 'Criação de um laboratório' })
  @Post()
  async createLab(@Body() input: CreateLabInput): Promise<LabsEntity> {
    return this.labsService.createLab(input);
  }

  @ApiHeader({ name: 'Criação de laboratórios em lote' })
  @Post('batch')
  async createLabs(@Body() input: CreateLabInput[]): Promise<LabsEntity[]> {
    return this.labsService.createLabs(input);
  }

  @ApiHeader({ name: 'Retorna laboratórios ativos' })
  @Get()
  async getLabs(): Promise<LabsEntity[]> {
    return this.labsService.getLabs();
  }

  @ApiHeader({ name: 'Atualização de um laboratório por id' })
  @Put(':id')
  async updateLabById(@Param('id') labId: number, @Body() partialLab: UpdateLabInput): Promise<LabsEntity> {
    return this.labsService.updateLabById(labId, partialLab);
  }

  @ApiHeader({ name: 'Desativação de um laboratório por id' })
  @Delete(':id')
  async deleteLabById(@Param('id') labId: number): Promise<LabsEntity> {
    return this.labsService.deleteLabById(labId);
  }
}
