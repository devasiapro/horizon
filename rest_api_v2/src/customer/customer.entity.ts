import { 
  BaseEntity, 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  OneToMany,
  JoinColumn
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Company } from '../company/company.entity';
import { GameSession } from '../game-session/game-session.entity';
import { WalletType } from '../wallet-type/wallet-type.entity';
import { Kiosk } from '../kiosk/kiosk.entity';
import { Instance } from '../instance/instance.entity';

@Entity()
export class Customer {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256, name: 'brand_name' })
  brandName: string;

  @ManyToOne(() => WalletType, (walletType) => walletType.customers)
  walletType: WalletType

  @ManyToOne(() => Customer, (customer) => customer.subCustomers)
  @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
  parent: Customer;

  @OneToMany(() => Customer, (customer) => customer.parent)
  subCustomers: Customer[];

  @ManyToOne(() => Kiosk, (kiosk) => kiosk.customers)
  kiosk: Kiosk;

  @ManyToOne(() => Instance, (instance) => instance.customers)
  instance: Instance;

  @Column({ length: 256 })
  contactPerson: string;

  @Column({ length: 256 })
  email: string;

  @Column({ length: 256 })
  skypeGroup: string;


}
