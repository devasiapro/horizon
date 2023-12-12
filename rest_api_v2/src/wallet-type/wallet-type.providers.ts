import { DataSource } from 'typeorm';
import { WalletType } from './wallet-type.entity';

export const walletTypeProviders = [
  {
    provide: 'WALLET_TYPE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(WalletType),
    inject: ['DATA_SOURCE']
  }
];
