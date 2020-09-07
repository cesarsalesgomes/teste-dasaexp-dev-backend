/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { TEST_MODULE_ONLY_FOR_TESTS_ERROR } from './errors';

@Injectable()
export class TestService {
  constructor(
    @InjectConnection()
    private connection: Connection
  ) {
    if (process.env.NODE_ENV !== 'test') {
      throw TEST_MODULE_ONLY_FOR_TESTS_ERROR;
    }
  }

  /**
   * Limpa base de dados após cada teste integrado
   */
  async cleanAll(): Promise<void> {
    try {
      for (const entity of this.getEntities()) {
        const repository = await this.getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName};`);
      }
    } catch (error) {
      throw new Error(`ERROR: Limpando base de dados: ${error}`);
    }
  }

  getEntities(): { name: string, tableName: string }[] {
    const entities = [];

    this.connection.entityMetadatas.forEach(
      (x) => entities.push({ name: x.name, tableName: x.tableName })
    );

    return entities;
  }

  async getRepository<T>(entity: string): Promise<Repository<T>> {
    return this.connection.getRepository(entity);
  }

  /**
  * Fecha conexão após cada teste integrado
  */
  async closeDbConnection(): Promise<void> {
    if (this.connection.isConnected) {
      await this.connection.close();
    }
  }
}
