import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { gameSessionProviders } from './game-session.providers';
import { GameSessionService } from './game-session.service';
import { GameSession } from './game-session.entity';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...gameSessionProviders,
    GameSessionService
  ],
  exports: [GameSessionService]
})
export class GameSessionModule {}
