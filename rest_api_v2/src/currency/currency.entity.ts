import {
  BaseEntity,
  Entity,
  Column,
  JoinColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Player } from '../player/player.entity';
import { GameSession } from '../game-session/game-session.entity';

@Entity()
export class Currency {
  @PrimaryColumn('varchar', { length: 45 })
  currencyCode: string

  @OneToMany(() => Player, (player) => player.currency)
  players: Player[]

  @OneToMany(() => GameSession, (gameSession) => gameSession.currency)
  gameSessions: GameSession[]
}
