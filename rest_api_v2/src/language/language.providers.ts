import { DataSource } from 'typeorm';
import { Language } from './language.entity';

export const languageProviders = [
  {
    provide: 'LANGUAGE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Language),
    inject: ['DATA_SOURCE']
  }
];
