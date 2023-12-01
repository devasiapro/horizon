import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class CustomerCreate1701149558882 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'customer',
          columns: [
            {
              name: 'id',
              type: 'int',
              generationStrategy: 'increment',
              isGenerated: true,
              isPrimary: true,
            },
            {
              name: 'brand_name',
              type: 'varchar(256)', 
            },
            {
              name: 'instance_id',
              type: 'int',
            },
            {
              name: 'company_id',
              type: 'int',
            }
          ],
        }),
        true
      );

      await queryRunner.createForeignKey(
        'customer',
        new TableForeignKey({
          columnNames: ['instance_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'instance',
          onDelete: 'CASCADE',  
        })
      );

      await queryRunner.createForeignKey(
        'customer',
        new TableForeignKey({
          columnNames: ['company_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'company',
          onDelete: 'CASCADE'
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('customer');
    }
}
