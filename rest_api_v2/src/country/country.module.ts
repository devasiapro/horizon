import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { Country } from './country.entity';
import { countryProviders } from './country.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...countryProviders,
    CountryService
  ],
  exports : [CountryService]
})
export class CountryModule {}
