import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { customerProviders } from './customer.providers';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';
import { WalletTypeModule } from '../wallet-type/wallet-type.module';
import { KioskModule } from '../kiosk/kiosk.module';
import { InstanceModule } from '../instance/instance.module';
import { GameSessionModule } from '../game-session/game-session.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    DatabaseModule, 
    WalletTypeModule,
    KioskModule,
    InstanceModule,
    GameSessionModule,
    AuthModule
  ],
  providers: [
    ...customerProviders,
    CustomerService
  ],
  controllers: [CustomerController],
  exports: [CustomerService]
})
export class CustomerModule {}
