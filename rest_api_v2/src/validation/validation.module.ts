import { Module } from '@nestjs/common';
import { CustomerUniqueRule } from './customer-unique.rule';
import { CustomerExistsRule } from './customer-exists.rule';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [CustomerModule],
  providers: [
    CustomerUniqueRule,
    CustomerExistsRule
  ],
  exports: [
    CustomerUniqueRule,
    CustomerExistsRule
  ]
})
export class ValidationModule {}
