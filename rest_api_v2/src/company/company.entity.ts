import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Instance } from '../instance/instance.entity';

@Entity()
export class Company {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  name: string;

  @OneToMany(() => Instance, (instance) => instance.company)
  instances: Instance[];
}
