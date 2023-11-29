import { 
  BaseEntity, 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  OneToMany 
} from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Kiosk } from '../kiosk/kiosk.entity';

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
}
