import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLabsTable1599226933795 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'labs',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'name',
          type: 'varchar(256)',
          isNullable: false
        },
        {
          name: 'postcode',
          type: 'varchar(16)',
          isNullable: false
        },
        {
          name: 'state',
          type: 'enum',
          isNullable: false,
          enum: [
            'AC',
            'AL',
            'AP',
            'AM',
            'BA',
            'CE',
            'DF',
            'ES',
            'GO',
            'MA',
            'MT',
            'MS',
            'MG',
            'PA',
            'PB',
            'PR',
            'PE',
            'PI',
            'RJ',
            'RN',
            'RS',
            'RO',
            'RR',
            'SC',
            'SP',
            'SE',
            'TO'
          ]
        },
        {
          name: 'city',
          type: 'varchar(32)',
          isNullable: false
        },
        {
          name: 'street',
          type: 'varchar(128)',
          isNullable: false
        },
        {
          name: 'number',
          type: 'varchar(32)',
          isNullable: false
        },
        {
          name: 'neighborhood',
          type: 'varchar(128)',
          isNullable: false
        },
        {
          name: 'additionalInfo',
          type: 'varchar(256)',
          isNullable: true
        },
        {
          name: 'status',
          type: 'enum',
          isNullable: false,
          enum: ['ATIVO', 'INATIVO']
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          isNullable: false
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          isNullable: false
        },
        {
          name: 'deletedAt',
          type: 'timestamp',
          isNullable: true
        }
      ]
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('labs');
  }
}
