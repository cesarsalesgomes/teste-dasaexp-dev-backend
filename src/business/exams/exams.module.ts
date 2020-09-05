import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ExamsEntity from './exams.entity';
import { ExamsController } from './exams.controller';
import ExamsService from './exams.service';
import ExamsFactory from './exams.factory';

@Module({
  imports: [TypeOrmModule.forFeature([ExamsEntity])],
  controllers: [ExamsController],
  providers: [ExamsService, ExamsFactory],
  exports: [ExamsService]
})
export default class ExamsModule { }
