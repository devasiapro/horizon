import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { contactProviders } from './contact.providers';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [
    DatabaseModule,
    CustomerModule,
    AuthModule
  ],
  controllers: [ContactController],
  providers: [
    ...contactProviders,
    ContactService
  ],
  exports: [ContactService]
})
export class ContactModule {}
