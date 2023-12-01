import { DataSource } from 'typeorm';
import { GameType } from './game-type.entity';

export const gameTypeProviders = [
  {
    provide: 'GAME_TYPE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(GameType),
    inject: ['DATA_SOURCE']
  }
];
