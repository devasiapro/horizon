import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,
    TableColumn,
    TableForeignKey,
} from "typeorm"

export class InstanceCreate1701145624183 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table ({
          name: 'instance',
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
              type: 'varchar(256)'
            },
            {
              name: 'company_id',
              type: 'int',
            }
          ],
        }),
        true,
      );

      await queryRunner.createForeignKey(
        'instance',
        new TableForeignKey({
          columnNames: ['company_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'company',
          onDelete: 'CASCADE'
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('instance');
    }

}
