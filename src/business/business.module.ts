import { Module } from '@nestjs/common';
import LabsModule from './labs/labs.module';
import ExamsModule from './exams/exams.module';
import ExamsLabsModule from './exams-labs/exams-labs.module';

@Module({
  imports: [LabsModule, ExamsModule, ExamsLabsModule]
})
export default class BusinessModule { }
