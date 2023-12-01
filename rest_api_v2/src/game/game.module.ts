import { Module } from '@nestjs/common';
import { 
  BaseEntity, 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  OneToMany 
} from 'typeorm';
import { Game } from './game.entity';
import { ClientType } from './client-type.entity';
import { ClientPlatform } from './client-platform.entity';
import { GameType } from './game-type.entity';
import { DatabaseModule } from '../database/database.module';
import { clientPlatformProviders } from './client-platform.providers';
import { clientTypeProviders } from './client-type.providers';
import { gameTypeProviders } from './game-type.providers';
import { gameProviders } from './game.providers';
import { ClientTypeService } from './client-type.service';
import { ClientPlatformService } from './client-platform.service';
import { GameTypeService } from './game-type.service';
import { GameService } from './game.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...gameProviders,
    ...clientPlatformProviders,
    ...clientTypeProviders,
    ...gameTypeProviders,
    ClientTypeService,
    ClientPlatformService,
    GameTypeService,
    GameService
  ],
  exports: [ClientTypeService, ClientPlatformService, GameTypeService, GameService]
})
export class GameModule {}
