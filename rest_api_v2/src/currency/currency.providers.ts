import { DataSource } from 'typeorm';
import { Currency } from './currency.entity';

export const currencyProviders = [
  {
    provide: 'CURRENCY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Currency),
    inject: ['DATA_SOURCE']
  }
];
