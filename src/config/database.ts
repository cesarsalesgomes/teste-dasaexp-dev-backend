import { registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// Entities
import LabsEntity from '@src/business/labs/labs.entity';

export const typeormConfig = (migrations?: (string)[], migrationsDir?: string): PostgresConnectionOptions => {
  const {
    NODE_ENV, DATABASE_USER, DATABASE_PASS, DATABASE_DB, DATABASE_HOST, DATABASE_DB_TEST
  } = process.env;

  // Postgres
  const type = 'postgres';
  // User
  const username = DATABASE_USER;
  // Password
  const password = DATABASE_PASS;
  // Database
  const database = NODE_ENV === 'test' ? DATABASE_DB_TEST : DATABASE_DB;
  // Host
  const host = DATABASE_HOST;

  // Entities
  const entities = [LabsEntity];

  return {
    type,
    username,
    password,
    database,
    host,
    entities,
    synchronize: false,
    migrations,
    cli: {
      migrationsDir
    }
  };
};

export default registerAs('database', typeormConfig);
