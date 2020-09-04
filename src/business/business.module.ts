import { Module } from '@nestjs/common';
import LabsModule from './labs/labs.module';
import ExamsModule from './exams/exams.module';

@Module({
  imports: [LabsModule, ExamsModule]
})
export default class BusinessModule { }
