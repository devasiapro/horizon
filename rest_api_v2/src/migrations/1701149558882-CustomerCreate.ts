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
              isNullable: true,
            },
            {
              name: 'parent_id',
              type: 'int',
              isNullable: true,
            },
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
          columnNames: ['parent_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'customer',
          onDelete: 'CASCADE',  
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('customer');
    }
}
