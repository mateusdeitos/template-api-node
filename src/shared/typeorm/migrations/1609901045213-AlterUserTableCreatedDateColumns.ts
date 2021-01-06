import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterUserTableCreatedDateColumns1609901045213
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      }),
    ]);

    await queryRunner.changeColumn(
      'users',
      'id',
      new TableColumn({
        name: 'id',
        type: 'integer',
        isPrimary: true,
        generationStrategy: 'increment',
        isGenerated: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'id',
      new TableColumn({
        name: 'id',
        type: 'integer',
        isPrimary: true,
        generationStrategy: 'increment',
      }),
    );
    await queryRunner.dropColumn('users', 'created_at');
    await queryRunner.dropColumn('users', 'updated_at');
  }
}
