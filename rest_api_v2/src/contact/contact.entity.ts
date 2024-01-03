import { 
  BaseEntity, 
  Entity, 
  Column, 
  PrimaryColumn,
  PrimaryGeneratedColumn, 
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne
} from 'typeorm';
import { Customer } from '../customer/customer.entity';

@Entity()
export class Contact {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128 })
  email: string;

  @Column({ type: 'varchar', length: 128 })
  skypeId: string;

  @Column({ type: 'varchar', length: 512 })
  testUserCredential: string;

  @ManyToOne(() => Customer, (customer) => customer.contacts)
  customer: Customer;
}
