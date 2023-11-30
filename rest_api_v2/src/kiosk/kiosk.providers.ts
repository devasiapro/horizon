import { DataSource } from 'typeorm';
import { Kiosk } from './kiosk.entity';

export const kioskProviders = [
  {
    provide: 'KIOSK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Kiosk),
    inject: ['DATA_SOURCE']
  }
];
