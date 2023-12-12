import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CustomerModule } from '../customer/customer.module';
import { InstanceModule } from '../instance/instance.module';
import { CompanyModule } from '../company/company.module';
import { GameModule } from '../game/game.module';
import { GameSessionModule } from '../game-session/game-session.module';
import { PlayerModule } from '../player/player.module';
import { LanguageModule } from '../language/language.module';
import { CountryModule } from '../country/country.module';
import { CurrencyModule } from '../currency/currency.module';
import { KioskModule } from '../kiosk/kiosk.module';
import { UserModule } from '../user/user.module';
import { WalletTypeModule } from '../wallet-type/wallet-type.module';
import { GameFetcher } from './game-fetcher';
import { Seeder } from './seeder';
import { Initializer } from './initializer';
import { UserGenerator } from './user-generator';
import { DragonSharedSeederService } from './dragon-shared-seeder.service';
import { FlyingDragonSeederService } from './flying-dragon-seeder.service';

@Module({
  providers: [
    DragonSharedSeederService, 
    GameFetcher, 
    Seeder, 
    UserGenerator, 
    Initializer,
    FlyingDragonSeederService
  ],
  imports: [
    CustomerModule, 
    InstanceModule, 
    GameSessionModule,
    GameModule,
    CompanyModule,
    CountryModule,
    CurrencyModule,
    LanguageModule,
    PlayerModule,
    KioskModule,
    UserModule,
    WalletTypeModule,
    ConfigModule.forRoot()
  ]
})
export class CommandModule {}
