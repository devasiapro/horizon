import { Injectable, Inject } from '@nestjs/common';
import { Repository, Between } from 'typeorm';
import { GameSession } from './game-session.entity';
import { Customer } from '../customer/customer.entity';
import { WalletTypeEnum } from '../wallet-type/wallet-type.enum';

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

  public async findAll(startDate, endDate) {
    console.log(startDate == endDate);
    const gameSessions = await this
      .gameSessionRepository
      .find({
        select: {
          id: true, 
          kioskId: true, 
          instanceId: true,
          datePlayed: true,
          maximumRtp: true,
          gamesCount: true,
          playersCount: true,
          totalBets: true,
          totalGameBets: true,
          totalGameWins: true,
          totalIncome: true,
          refund: true,
          totalPlayerWins: true,
        },
        relations: {
          player: {
            country: true
          },
          game: {
            clientType: true,
            clientPlatform: true,
            gameType: true
          }
        },
        where: {
          datePlayed: startDate == endDate ? startDate : Between(startDate, endDate)        
        }
      });
    return Promise.resolve(gameSessions);
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
      select: {
        id: true, 
        kioskId: true, 
        instanceId: true,
        datePlayed: true,
        maximumRtp: true,
        gamesCount: true,
        playersCount: true,
        totalBets: true,
        totalGameBets: true,
        totalGameWins: true,
        totalIncome: true,
        refund: true,
        totalPlayerWins: true,
      },
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

  public async fetchByCustomer(customer: Customer, startDate, endDate) { 
    if (customer.walletType.id == WalletTypeEnum.SEAMLESS) {
      if (!customer.instance) {
        return Promise.resolve([]);
      }
      const gameSessions = await this.findAllByInstance(
        customer.instance.id,
        startDate,
        endDate
      );
      return Promise.resolve(gameSessions);
    }

    if (customer.walletType.id == WalletTypeEnum.TRANSFER) {
      if (!customer.kiosk) {
        return Promise.resolve([]);
      }
      const gameSessions = await this.findAllByKiosk(
        customer.kiosk.id,
        startDate,
        endDate
      );
      return Promise.resolve(gameSessions);
    }

    return Promise.resolve([]);
  }
}
