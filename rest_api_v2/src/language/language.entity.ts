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
export class Language {
  @PrimaryColumn('varchar', { length: 128 })
  language: string

  @OneToMany(() => Player, (player) => player.language)
  players: Player[]

  @OneToMany(() => GameSession, (gameSession) => gameSession.language)
  gameSessions: GameSession[]
}
