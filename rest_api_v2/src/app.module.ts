import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CommandModule } from './command/command.module';
import { DatabaseModule } from './database/database.module';
import { InstanceModule } from './instance/instance.module';
import { GameSessionModule } from './game-session/game-session.module';

@Module({
  imports: [CommandModule, DatabaseModule, InstanceModule, GameSessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
