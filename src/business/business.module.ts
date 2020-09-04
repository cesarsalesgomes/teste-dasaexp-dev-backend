import { Module } from '@nestjs/common';
import LabsModule from './labs/labs.module';

@Module({
  imports: [LabsModule]
})
export default class BusinessModule { }
