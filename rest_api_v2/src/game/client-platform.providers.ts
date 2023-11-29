import { DataSource } from 'typeorm';
import { ClientPlatform } from './client-platform.entity';

export const clientPlatformProviders = [
  {
    provide: 'CLIENT_PLATFORM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ClientPlatform),
    inject: ['DATA_SOURCE']
  }
];
