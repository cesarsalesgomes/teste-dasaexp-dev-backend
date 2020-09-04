import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database';
import BusinessModule from './business/business.module';

@Module({
  imports: [
    // Variáveis de ambiente
    ConfigModule.forRoot({ load: [databaseConfig] }),

    // Conexão com Postgres
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService]
    }),

    // Módulos de negócio
    BusinessModule
  ]
})
export class AppModule { }
