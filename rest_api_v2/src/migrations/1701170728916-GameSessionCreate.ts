import { 
  MigrationInterface, 
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey
} from "typeorm"

export class GameSessionCreate1701170728916 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'game_session',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment'
            },
            {
              name: 'kiosk_id',
              type: 'int',
              isNullable: true
            },
            {
              name: 'instance_id',
              type: 'int',
            },
            {
              name: 'player_code',
              type: 'varchar(128)'
            },
            {
              name: 'currency_code',
              type: 'varchar(45)'
            },
            {
              name: 'date_played',
              type: 'date'
            },
            {
              name: 'game_id',
              type: 'int'
            },
            {
              name: 'maximum_rtp',
              type: 'decimal(19, 4)',
              isNullable: true
            },
            {
              name: 'free_spin_win',
              type: 'decimal(19, 4)',
              isNullable: true
            },
            {
              name: 'associated_golden_chips_win',
              type: 'decimal(19, 4)',
              isNullable: true
            },
            {
              name: 'autoplay_bets',
              type: 'decimal(19, 4)',
              isNullable: true
            },
            {
              name: 'autoplay_progressive_bets',
              type: 'decimal(19, 4)',
              isNullable: true
            },
            {
              name: 'autoplay_progressive_wins',
              type: 'decimal(19, 4)',
              isNullable: true,
            },
            {
              name: 'autoplay_wins',
              type: 'decimal(19, 4)',
              isNullable: true
            },
            {
              name: 'average_bets',
              type: 'decimal(19, 4)',
              isNullable: true
            },
            {
              name: 'bonus_bets',
              type: 'decimal(19, 4)',
              isNullable: true
            },
            {
              name: 'bonus_money_live_game_tips',
              type: 'decimal(19, 4)',
              isNullable: true
            },
            {
              name: 'bonus_wins',
              type: 'decimal(19, 4)',
              isNullable: true
            },
            {
              name: 'comps',
              type: 'decimal(19, 4)',
              isNullable: true
            },
            {
              name: 'days_played',
              type: 'int',
              isNullable: true
            },
            {
              name: 'deducted_golden_chip',
              type: 'int',
              isNullable: true
            },
            {
              name: 'free_spin_bet',
              type: 'int',
              isNullable: true
            },
            {
              name: 'free_spin_count',
              type: 'int',
              isNullable: true
            },
            {
              name: 'net_payout',
              type: 'decimal(19, 2)',
              isNullable: true
            },
            {
              name: 'game_income_share',
              type: 'decimal(19, 2)',
              isNullable: true
            },
            {
              name: 'games_count',
              type: 'int',
              isNullable: true
            },
            {
              name: 'golden_chip_bet',
              type: 'decimal(19, 2)',
              isNullable: true
            },
            {
              name: 'golden_chip_win',
              type: 'decimal(19, 2)',
              isNullable: true
            },
            {
              name: 'overall_game_payout',
              type: 'decimal(19, 2)',
              isNullable: true
            },
            {
              name: 'players_count',
              type: 'decimal(19, 2)',
              isNullable: true
            },
            {
              name: 'jackpot_bets',
              type: 'decimal(19, 2)',
              isNullable: true
            },
            {
              name: 'jackpot_wins',
              type: 'decimal(19, 2)',
              isNullable: true
            },
            {
              name: 'real_hold',
              type: 'decimal(19, 2)',
              isNullable: true
            },
            {
              name: 'real_bets',
              type: 'decimal(19, 2)',
              isNullable: true
            },
            {
              name: 'real_money_income',
              type: 'decimal(19, 2)',
              isNullable: true
            },
            {
              name: 'real_money_live_game_tips',
              type: 'decimal(19, 2)',
              isNullable: true
            },
            {
              name: 'real_payout',
              type: 'decimal(19, 2)',
              isNullable: true
            },
            {
              name: 'real_jackpot_wins',
              type: 'decimal(19, 2)',
              isNullable: true
            },
            {
              name: 'real_wins',
              type: 'decimal(19, 2)',
              isNullable: true
            },
            {
              name: 'returned_golden_chips',
              type: 'decimal(19, 2)',
              isNullable: true
            },
            {
              name: 'total_bets',
              type: 'decimal(19, 2)',
              isNullable: true
            },
            {
              name: 'total_game_bets',
              type: 'decimal(19, 2)',
              isNullable: true
            },
            {
              name: 'total_game_wins',
              type: 'decimal(19, 2)',
              isNullable: true
            },
            {
              name: 'total_income',
              type: 'decimal(19, 2)',
              isNullable: true
            },
            {
              name: 'refund',
              type: 'decimal(19, 2)',
              isNullable: true
            },
            {
              name: 'total_player_wins',
              type: 'decimal(19, 2)',
              isNullable: true
            },
            {
              name: 'language',
              type: 'varchar(45)'
            }
          ]
        }),
        true
      );

      await queryRunner.createForeignKey(
        'game_session',
        new TableForeignKey({
          columnNames: ['kiosk_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'kiosk', 
          onDelete: 'CASCADE'
        })
      );

      await queryRunner.createForeignKey(
        'game_session',
        new TableForeignKey({
          columnNames: ['game_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'game',
          onDelete: 'CASCADE'
        })
      );

      await queryRunner.createForeignKey(
        'game_session',
        new TableForeignKey({
          columnNames: ['player_code'],
          referencedColumnNames: ['player_code'],
          referencedTableName: 'player',
          onDelete: 'CASCADE'
        })
      );

      await queryRunner.createForeignKey(
        'game_session',
        new TableForeignKey({
          columnNames: ['currency_code'],
          referencedColumnNames: ['currency_code'],
          referencedTableName: 'currency',
          onDelete: 'CASCADE'
        })
      );

      await queryRunner.createForeignKey(
        'game_session',
        new TableForeignKey({
          columnNames: ['language'],
          referencedColumnNames: ['language'],
          referencedTableName: 'language',
          onDelete: 'CASCADE'
        })
      );

      await queryRunner.createForeignKey(
        'game_session',
        new TableForeignKey({
          columnNames: ['instance_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'instance',
          onDelete: 'CASCADE'
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('game_session');
    }

}
