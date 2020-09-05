import {
  MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex, TableUnique
} from 'typeorm';

export class CreateExamsLabsTable1599316134608 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'exams_labs',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'examId',
          type: 'int',
          isNullable: false
        },
        {
          name: 'labId',
          type: 'int',
          isNullable: false
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

    // FKs
    await queryRunner.createForeignKey('exams_labs', new TableForeignKey({
      columnNames: ['examId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'exams',
      onDelete: 'CASCADE'
    }));

    await queryRunner.createForeignKey('exams_labs', new TableForeignKey({
      columnNames: ['labId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'labs',
      onDelete: 'CASCADE'
    }));

    // Índices
    await queryRunner.createIndex('exams_labs', new TableIndex({
      name: 'exams_labs_exams_index',
      columnNames: ['examId']
    }));

    await queryRunner.createIndex('exams_labs', new TableIndex({
      name: 'exams_labs_labs_index',
      columnNames: ['labId']
    }));

    // Chave única em relação entre laboratório e um exame
    await queryRunner.createUniqueConstraint('exams_labs', new TableUnique({
      name: 'exams_labs_unique_key',
      columnNames: ['examId', 'labId']
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('exams_labs', 'exams_labs_exams_index');

    await queryRunner.dropIndex('exams_labs', 'exams_labs_labs_index');

    await queryRunner.dropTable('exams_labs');
  }
}
