import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Game } from './game.entity';

@Injectable()
export class GameService {
  public constructor(
    @Inject('GAME_REPOSITORY')
    private gameRepository: Repository<Game>,
  ) {}

  public async findByName(gameName: string): Promise<Game> {
    const game = await this.gameRepository.findOneBy({ name: gameName });
    return game;
  }

  public async store(game: Game): Promise<Game> {
    await this.gameRepository.save(game);
    return game;
  }
}
