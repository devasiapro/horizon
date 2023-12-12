import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { walletTypeProviders } from './wallet-type.providers';
import { WalletTypeService } from './wallet-type.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...walletTypeProviders,
    WalletTypeService
  ],
  controllers: [],
  exports: [WalletTypeService]
})
export class WalletTypeModule {}
