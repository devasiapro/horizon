import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { customerProviders } from './customer.providers';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...customerProviders,
    CustomerService
  ],
  exports: [CustomerService]
})
export class CustomerModule {}
