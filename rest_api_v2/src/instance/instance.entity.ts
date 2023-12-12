import { 
  BaseEntity, 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  OneToMany,
  ManyToOne
} from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { GameSession } from '../game-session/game-session.entity';
import { Kiosk } from '../kiosk/kiosk.entity';
import { Company } from '../company/company.entity';

@Entity()
export class Instance {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  name: string;

  @OneToMany(() => Customer, (customer) => customer.instance)
  customers: Customer[]

  @OneToMany(() => Kiosk, (kiosk) => kiosk.instance)
  kiosks: Kiosk[]

  @OneToMany(() => GameSession, (gameSession) => gameSession.kiosk)
  gameSessions: GameSession[]

  @ManyToOne(() => Company, (company) => company.instances)
  company: Company
}
