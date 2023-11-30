import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GameSession } from './game-session.entity';

@Injectable()
export class GameSessionService {
  public constructor(
    @Inject('GAME_SESSION_REPOSITORY')
    private gameSessionRepository: Repository<GameSession>,
  ) {}

  public async store(gameSession: GameSession): Promise<GameSession> {
    await this.gameSessionRepository.save(gameSession);
    return gameSession;
  }
}
