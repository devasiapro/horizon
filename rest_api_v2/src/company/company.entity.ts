import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Customer } from '../customer/customer.entity';

@Entity()
export class Company {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  name: string;

  @OneToMany(() => Customer, (customer) => customer.company)
  customers: Customer[]
}
