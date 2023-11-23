import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Customer } from '../customer/customer.entity';

@Entity()
export class GameSession {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 9, scale: 2, default: 0 })
  totalIncome: number;

  @ManyToOne(() => Customer, (customer) => customer.gameSessions)
  customer: Customer;
}
