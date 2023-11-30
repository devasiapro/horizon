import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { languageProviders } from './language.providers';
import { LanguageService } from './language.service';
import { Language } from './language.entity';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...languageProviders,
    LanguageService
  ],
  exports: [LanguageService]
})
export class LanguageModule {}
