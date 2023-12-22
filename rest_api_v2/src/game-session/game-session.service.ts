import { Injectable, Inject } from '@nestjs/common';
import { Repository, Between } from 'typeorm';
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

  public async findAllByInstance(instanceId, startDate, endDate) {
    console.log(instanceId, startDate, endDate);
    const gameSessions = await this.gameSessionRepository.find({
      relations: {
        player: {
          country: true
        }
      },
      where: {
        instanceId: instanceId,
        datePlayed: Between(startDate, endDate)        
      }
    });
    return gameSessions;
  }

  public async findAllByKiosk(kioskId, startDate, endDate) {
    console.log('findAllByKiosk', kioskId, startDate, endDate);
    const gameSessions = await this.gameSessionRepository.find({
      relations: {
        player: {
          country: true
        }
      },
      where: {
        kioskId: kioskId,
        datePlayed: Between(startDate, endDate)        
      }
    });
    return gameSessions;
  }
}
