import { DataSource } from 'typeorm';
import { TopLevelEntity } from './top-level-entity.entity';

export const topLevelEntityProviders = [
  {
    provide: 'TOP_LEVEL_ENTITY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TopLevelEntity),
    inject: ['DATA_SOURCE']
  }
];
