import { DataSource } from 'typeorm';
import { GameSession } from './game-session.entity';

export const gameSessionProviders = [
  {
    provide: 'GAME_SESSION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(GameSession),
    inject: ['DATA_SOURCE']
  }
];
