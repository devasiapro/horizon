import { 
  MigrationInterface, 
  QueryRunner,
  Table,
  TableForeignKey
} from "typeorm"

export class ContactCreate1704193153156 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'contact',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment'
            },
            {
              name: 'email',
              type: 'varchar(128)',
              isNullable: true
            },
            {
              name: 'skype_id',
              type: 'varchar(128)',
              isNullable: true
            },
            {
              name: 'test_user_credential',
              type: 'varchar(512)',
              isNullable: true
            },
            {
              name: 'customer_id',
              type: 'int'
            },
          ],
        }),
        true
      );

      await queryRunner.createForeignKey(
        'contact',
        new TableForeignKey({
          columnNames: ['customer_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'contact',
          onDelete: 'CASCADE'
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('contact');
    }

}
