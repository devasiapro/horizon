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
import { Customer } from '../customer/customer.entity';

@Entity()
export class WalletType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  name: string

  @OneToMany(() => Customer, (customer) => customer.walletType)
  customers: Customer[]
}
