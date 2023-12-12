import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { customerProviders } from './customer.providers';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...customerProviders,
    CustomerService
  ],
  controllers: [CustomerController],
  exports: [CustomerService]
})
export class CustomerModule {}
