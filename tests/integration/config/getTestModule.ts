import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../src/app.module';
import { TestService } from './test.service';
import { TestModule } from './test.module';

export const getTestModule = async (): Promise<{ app: INestApplication, testService: TestService }> => {
  const testingModuleBuilder = Test.createTestingModule({ imports: [AppModule, TestModule] });

  const testingModule = await testingModuleBuilder.compile();
  const app = testingModule.createNestApplication();

  await app.init();

  // Serviço responsável por inicializar/finalizar conexão com banco de dados
  const testService = testingModule.get<TestService>(TestService);

  return { app, testService };
};
