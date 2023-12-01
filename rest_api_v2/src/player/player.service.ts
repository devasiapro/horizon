import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Player } from './player.entity';

@Injectable()
export class PlayerService {
  public constructor(
    @Inject('PLAYER_REPOSITORY')
    private playerRepository: Repository<Player>,
  ) {}

  public async findByPlayerCode(playerCode: string): Promise<Player> {
    const player = await this.playerRepository.findOneBy({ playerCode: playerCode });
    return player;
  }

  public async store(player: Player): Promise<Player> {
    await this.playerRepository.save(player);
    return player;
  }
}
