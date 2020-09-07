import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestService } from './test.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [TestService]
})
export class TestModule { }
