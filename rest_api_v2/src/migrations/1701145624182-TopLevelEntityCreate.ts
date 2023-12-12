import { 
  MigrationInterface, 
  QueryRunner, 
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey
} from "typeorm"

export class TopLevelEntityCreate1701145624182 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'top_level_entity',
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
          ],
        }),
        true
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('top_level_entity');
    }
}
