import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import LabsEntity from './labs.entity';
import { LabsController } from './labs.controller';
import LabsService from './labs.service';
import LabsFactory from './labs.factory';

@Module({
  imports: [TypeOrmModule.forFeature([LabsEntity])],
  controllers: [LabsController],
  providers: [LabsService, LabsFactory],
  exports: [LabsService]
})
export default class LabsModule { }
