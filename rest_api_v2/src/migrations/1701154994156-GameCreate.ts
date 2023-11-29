import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class GameCreate1701154994156 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'game',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'name',
              type: 'varchar(256)',
            },
            {
              name: 'client_type',
              type: 'varchar(128)',
              isNullable: true,
            },
            {
              name: 'client_platform',
              type: 'varchar(128)',
              isNullable: true,
            },
            {
              name: 'game_type',
              type: 'varchar(128)',
              isNullable: true,
            }
          ]
        }),
        true
      );

      await queryRunner.createForeignKey(
        'game',
        new TableForeignKey({
          columnNames: ['client_type'],
          referencedColumnNames: ['name'],
          referencedTableName: 'client_type',
          onDelete: 'CASCADE'
        })
      );

      await queryRunner.createForeignKey(
        'game',
        new TableForeignKey({
          columnNames: ['client_platform'],
          referencedColumnNames: ['name'],
          referencedTableName: 'client_platform',
          onDelete: 'CASCADE'
        })
      );

      await queryRunner.createForeignKey(
        'game',
        new TableForeignKey({
          columnNames: ['game_type'],
          referencedColumnNames: ['name'],
          referencedTableName: 'game_type',
          onDelete: 'CASCADE'
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('game');
    }

}
