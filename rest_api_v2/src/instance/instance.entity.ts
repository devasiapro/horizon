import { 
  BaseEntity, 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  OneToMany 
} from 'typeorm';
import { Customer } from '../customer/customer.entity';

@Entity()
export class Instance {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  name: string;

  @OneToMany(() => Customer, (customer) => customer.instance)
  customers: Customer[]
}
