import { MigrationInterface, QueryRunner, TableIndex } from "typeorm"

export class GameSessionDatePlayedIndex1704339189164 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createIndex(
        'game_session',
        new TableIndex({
          name: 'IDX_GAME_SESSION_DATE_PLAYED',
          columnNames: ['date_played']
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropIndex("game_session", "IDX_GAME_SESSION_DATE_PLAYED")
    }
}
