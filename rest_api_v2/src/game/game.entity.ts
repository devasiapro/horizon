import { 
  BaseEntity, 
  Entity, 
  Column, 
  JoinColumn,
  PrimaryGeneratedColumn, 
  ManyToOne, 
  OneToMany 
} from 'typeorm';
import { ClientType } from './client-type.entity';
import { ClientPlatform } from './client-platform.entity';
import { GameType } from './game-type.entity';
import { GameSession } from '../game-session/game-session.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  name: string;

  @ManyToOne(() => ClientType, (clientType) => clientType.games)
  @JoinColumn({ name: 'client_type', referencedColumnName: 'name' })
  clientType: ClientType;

  @ManyToOne(() => ClientPlatform, (clientPlatform) => clientPlatform.games)
  @JoinColumn({ name: 'client_platform', referencedColumnName: 'name' })
  clientPlatform: ClientPlatform;

  @ManyToOne(() => GameType, (gameType) => gameType.games)
  @JoinColumn({ name: 'game_type', referencedColumnName: 'name' })
  gameType: GameType;

  @OneToMany(() => GameSession, (gameSession) => gameSession.game)
  gameSessions: GameSession[];
}
