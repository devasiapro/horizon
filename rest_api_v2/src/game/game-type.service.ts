import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GameType } from './game-type.entity';

@Injectable()
export class GameTypeService {
  public constructor(
    @Inject('GAME_TYPE_REPOSITORY')
    private gameTypeRepository: Repository<GameType>,
  ) {}

  public async findByName(gameTypeName: string): Promise<GameType> {
    const gameType = await this.gameTypeRepository.findOneBy({ name: gameTypeName });
    return gameType;
  }

  public async store(gameType: GameType): Promise<GameType> {
    await this.gameTypeRepository.save(gameType);
    return gameType;
  }
}
