import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UsersTableStatusColumn1620037962924
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'status',
        type: 'varchar',
        default: '"inactive"',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'status');
  }
}
