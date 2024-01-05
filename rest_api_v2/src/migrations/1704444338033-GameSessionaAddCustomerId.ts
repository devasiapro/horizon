import { 
  MigrationInterface, 
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey
} from "typeorm"

export class GameSessionaAddCustomerId1704444338033 implements MigrationInterface {
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'game_session', 
      new TableColumn({
        name: 'customer_id',
        type: 'int',
        isNullable: true, 
      })
    );

    await queryRunner.createForeignKey(
      'game_session',
      new TableForeignKey({
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customer',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("game_session", "customer_id");
  }
}
