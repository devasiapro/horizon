import { 
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { TopLevelEntity } from './top-level-entity.entity';
import { Instance } from '../instance/instance.entity';
import { GameSession } from '../game-session/game-session.entity';

@Entity()
export class Kiosk {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 256 })
  name: string

  @ManyToOne(() => TopLevelEntity, (topLevelEntity) => topLevelEntity.kiosks)
  topLevelEntity: TopLevelEntity

  @ManyToOne(() => Instance, (instance) => instance.kiosks)
  instance: Instance

  @OneToMany(() => GameSession, (gameSession) => gameSession.kiosk)
  gameSessions: GameSession[]
}
