import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamsLabsEntity } from './exams-labs.entity';
import { ExamsLabsController } from './exams-labs.controller';
import ExamsLabsService from './exams-labs.service';
import ExamsLabsFactory from './exams-labs.factory';
import LabsModule from '../labs/labs.module';
import ExamsModule from '../exams/exams.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExamsLabsEntity]), ExamsModule, LabsModule],
  controllers: [ExamsLabsController],
  providers: [ExamsLabsService, ExamsLabsFactory],
  exports: [ExamsLabsService]
})
export default class ExamsLabsModule { }
