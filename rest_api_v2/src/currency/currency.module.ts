import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { currencyProviders } from './currency.providers';
import { Currency } from './currency.entity';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...currencyProviders,
    CurrencyService
  ],
  exports: [CurrencyService]
})
export class CurrencyModule {}
