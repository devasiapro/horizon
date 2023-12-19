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
              name: 'wallet_type_id',
              type: 'int',
            },
            {
              name: 'parent_id',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'instance_id',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'kiosk_id',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'contact_person',
              type: 'varchar(256)', 
              isNullable: true,
            },
            {
              name: 'email',
              type: 'varchar(256)', 
              isNullable: true,
            },
            {
              name: 'skype_group',
              type: 'varchar(256)', 
              isNullable: true,
            },
          ],
        }),
        true
      );

      await queryRunner.createForeignKey(
        'customer',
        new TableForeignKey({
          columnNames: ['wallet_type_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'wallet_type',
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
      
      await queryRunner.createForeignKey(
        'customer',
        new TableForeignKey({
          columnNames: ['kiosk_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'kiosk',
          onDelete: 'CASCADE',  
        })
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('customer');
    }
}
