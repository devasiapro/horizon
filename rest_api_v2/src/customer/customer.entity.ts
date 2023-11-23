import { 
  BaseEntity, 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  OneToMany 
} from 'typeorm';
import { Instance } from '../instance/instance.entity';
import { GameSession } from '../game-session/game-session.entity';

@Entity()
export class Customer {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  brandName: string;

  @ManyToOne(() => Instance, (instance) => instance.customers)
  instance: Instance

  @OneToMany(() => GameSession, (gameSession) => gameSession.customer)
  gameSessions: GameSession[]
}
