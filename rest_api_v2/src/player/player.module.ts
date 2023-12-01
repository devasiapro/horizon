import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { playerProviders } from './player.providers';
import { Player } from './player.entity';
import { PlayerService } from './player.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...playerProviders,
    PlayerService
  ],
  exports: [PlayerService]
})
export class PlayerModule {}
