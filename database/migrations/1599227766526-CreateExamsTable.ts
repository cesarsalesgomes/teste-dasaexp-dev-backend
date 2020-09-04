import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateExamsTable1599227766526 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'exams',
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
          name: 'type',
          type: 'enum',
          isNullable: false,
          enum: [
            'ANALISE_CLINICA',
            'IMAGEM'
          ]
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
    await queryRunner.dropTable('exams');
  }
}
