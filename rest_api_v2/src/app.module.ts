import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CommandModule } from './command/command.module';
import { DatabaseModule } from './database/database.module';
import { InstanceModule } from './instance/instance.module';
import { GameSessionModule } from './game-session/game-session.module';
import { CompanyModule } from './company/company.module';
import { GameModule } from './game/game.module';
import { CountryModule } from './country/country.module';
import { LanguageModule } from './language/language.module';
import { CurrencyService } from './currency/currency.service';
import { CurrencyModule } from './currency/currency.module';
import { PlayerModule } from './player/player.module';
import { KioskModule } from './kiosk/kiosk.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { WalletTypeModule } from './wallet-type/wallet-type.module';
import { ValidationModule } from './validation/validation.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    CommandModule, 
    DatabaseModule, 
    InstanceModule, 
    GameSessionModule, 
    CompanyModule, 
    GameModule, 
    CountryModule, 
    LanguageModule, 
    CurrencyModule, 
    PlayerModule, 
    KioskModule,
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    ReportModule,
    WalletTypeModule,
    ValidationModule,
    ContactModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
