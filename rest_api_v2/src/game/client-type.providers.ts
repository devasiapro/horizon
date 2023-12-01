import { DataSource } from 'typeorm';
import { ClientType } from './client-type.entity';

export const clientTypeProviders = [
  {
    provide: 'CLIENT_TYPE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ClientType),
    inject: ['DATA_SOURCE']
  }
];
