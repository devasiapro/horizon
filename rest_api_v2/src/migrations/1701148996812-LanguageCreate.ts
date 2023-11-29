import {
  MigrationInterface, 
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class LanguageCreate1701148996812 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'language',
          columns: [
            {
              name: 'language',
              type: 'varchar(128)',
              isPrimary: true
            }
          ], 
        }),
        true
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('language');
    }

}
