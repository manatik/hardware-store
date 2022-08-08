import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class init1659953612928 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isNullable: false,
            generationStrategy: 'increment',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'firstname',
            type: 'varchar',
            isNullable: false,
            isUnique: false,
          },
          {
            name: 'lastname',
            type: 'varchar',
            isNullable: false,
            isUnique: false,
          },
          {
            name: 'patronymic',
            type: 'varchar',
            isNullable: false,
            isUnique: false,
          },
          {
            name: 'dob',
            type: 'timestamp',
            isNullable: true,
            isUnique: false,
          },
          {
            name: 'photo',
            type: 'varchar',
            isNullable: true,
            isUnique: false,
          },
          {
            name: 'date_created',
            type: 'timestamp',
            isNullable: false,
            isUnique: false,
            default: 'now()',
          },
          {
            name: 'date_updated',
            type: 'timestamp',
            isNullable: true,
            isUnique: false,
          },
          {
            name: 'date_deleted',
            type: 'timestamp',
            isNullable: true,
            isUnique: false,
          }
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
