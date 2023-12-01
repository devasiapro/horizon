import { 
  MigrationInterface, 
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey
} from "typeorm"

export class KioskCreate1701170728901 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'kiosk',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment'
            },
            {
              name: 'name',
              type: 'varchar(256)'
            },
            {
              name: 'instance_id',
              type: 'int',
            },
            {
              name: 'top_level_entity_id',
              type: 'int',
              isNullable: true
            }
          ]
        }),
        true
      );

      await queryRunner.createForeignKey(
        'kiosk',
        new TableForeignKey({
          columnNames: ['top_level_entity_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'top_level_entity',
          onDelete: 'CASCADE'
        })
      );

      await queryRunner.createForeignKey(
        'kiosk',
        new TableForeignKey({
          columnNames: ['instance_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'instance',
          onDelete: 'CASCADE'
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('kiosk');
    }
}
