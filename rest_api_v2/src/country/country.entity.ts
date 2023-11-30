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
import { Player } from '../player/player.entity';

@Entity()
export class Country {
  @PrimaryColumn('varchar', { length: 45 })
  country: string

  @OneToMany(() => Player, (player) => player.country)
  players: Player[]
}
