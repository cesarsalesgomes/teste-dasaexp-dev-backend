import { typeormConfig } from './src/config/database';

const migrations = ['database/migrations/*.ts'];
const migrationsDir = 'database/migrations';

const config = typeormConfig(migrations, migrationsDir);

export = config
