import { 
  MigrationInterface, 
  QueryRunner,
  Table,
  TableForeignKey
} from "typeorm"

export class UserCreate1701319625472 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'user',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'username',
              type: 'varchar(45)',
              isUnique: true, 
            },
            {
              name: 'password',
              type: 'varchar(256)',
            },
            {
              name: 'email',
              type: 'varchar(256)',
              isNullable: true
            },
            {
              name: 'role_id',
              type: 'int'
            },
          ],
        }),
        true
      );

      await queryRunner.createForeignKey(
        'user',
        new TableForeignKey({
          columnNames: ['role_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'role',
          onDelete: 'CASCADE',
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('user');
    }

}
