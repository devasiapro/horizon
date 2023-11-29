import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { companyProviders } from './company.providers';
import { Company } from './company.entity';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...companyProviders,
    CompanyService
  ],
  exports: [CompanyService]
})
export class CompanyModule {}
