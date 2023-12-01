import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class GameTypeCreate1701154746789 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'game_type',
          columns: [
            {
              name: 'name',
              type: 'varchar(128)',
              isPrimary: true
            }
          ]
        }),
        true
      ); 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('game_type');    
    }
}
