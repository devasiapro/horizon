import {
  BaseEntity,
  Entity,
  Column,
  JoinColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Game } from './game.entity';

@Entity()
export class ClientType {
  @PrimaryColumn('varchar', {length: 128})
  name: string

  @OneToMany(() => Game, (game) => game.clientType)
  @JoinColumn({ name: 'client_type', referencedColumnName: 'name' })
  games: Game[]
}
