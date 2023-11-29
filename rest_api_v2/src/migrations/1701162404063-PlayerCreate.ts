import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class PlayerCreate1701162404063 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'player',
          columns: [
            {
              name: 'player_code',
              type: 'varchar(128)',
              isPrimary: true,
            },
            {
              name: 'currency_code', 
              type: 'varchar(45)',
            },
            {
              name: 'language',
              type: 'varchar(128)',
            },
            {
              name: 'country',
              type: 'varchar(45)',
            },
            {
              name: 'username',
              type: 'varchar(256)',
            },
          ],
        }),
        true
      );

      await queryRunner.createForeignKey(
        'player',
        new TableForeignKey({
          columnNames: ['currency_code'],
          referencedColumnNames: ['currency_code'],
          referencedTableName: 'currency',
          onDelete: 'CASCADE',
        })
      );

      await queryRunner.createForeignKey(
        'player',
        new TableForeignKey({
          columnNames: ['language'],
          referencedColumnNames: ['language'],
          referencedTableName: 'language',
          onDelete: 'CASCADE',
        })
      );

      await queryRunner.createForeignKey(
        'player',
        new TableForeignKey({
          columnNames: ['country'],
          referencedColumnNames: ['country'],
          referencedTableName: 'country',
          onDelete: 'CASCADE',
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('player');
    }
}
