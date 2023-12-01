import { DataSource } from 'typeorm';
import { Instance } from './instance.entity';

export const instanceProviders = [
  {
    provide: 'INSTANCE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Instance),
    inject: ['DATA_SOURCE']
  }
];
