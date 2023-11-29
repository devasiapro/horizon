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
import { Kiosk } from './kiosk.entity';

@Entity()
export class TopLevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  name: string;

  @OneToMany(() => Kiosk, (kiosk) => kiosk.topLevelEntity)
  kiosks: Kiosk[]

}
