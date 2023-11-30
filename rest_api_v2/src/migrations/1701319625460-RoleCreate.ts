import { 
  MigrationInterface, 
  QueryRunner,
  Table,
  TableForeignKey
} from "typeorm"

export class RoleCreate1701319625460 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'role',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'role',
              type: 'varchar(45)'
            },
          ],
        }),
        true
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('role');
    }
    
}
