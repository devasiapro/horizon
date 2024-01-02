import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { gameSessionProviders } from './game-session.providers';
import { GameSessionService } from './game-session.service';
import { GameSession } from './game-session.entity';
import { GameSessionController } from './game-session.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [
    ...gameSessionProviders,
    GameSessionService
  ],
  exports: [GameSessionService],
  controllers: [GameSessionController]
})
export class GameSessionModule {}
