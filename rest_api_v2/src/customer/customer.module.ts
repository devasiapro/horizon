import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { customerProviders } from './customer.providers';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';
import { WalletTypeModule } from '../wallet-type/wallet-type.module';

@Module({
  imports: [
    DatabaseModule, 
    WalletTypeModule
  ],
  providers: [
    ...customerProviders,
    CustomerService
  ],
  controllers: [CustomerController],
  exports: [CustomerService]
})
export class CustomerModule {}
