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
import { Game } from './game.entity';

@Entity()
export class ClientPlatform {
  @PrimaryColumn('varchar', {length: 128})
  name: string

  @OneToMany(() => Game, (game) => game.clientPlatform)
  @JoinColumn({ name: 'client_platform', referencedColumnName: 'name' })
  games: Game[]
}
