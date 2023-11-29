import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class CurrencyCreate1701150360989 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'currency',
          columns: [
            {
              name: 'currency_code',
              type: 'varchar(45)',
              isPrimary: true
            }
          ],
        }),
        true
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('currency');
    }

}
