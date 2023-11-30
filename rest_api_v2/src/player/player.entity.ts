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
import { Language } from '../language/language.entity';
import { Country } from '../country/country.entity';
import { Currency } from '../currency/currency.entity';
import { GameSession } from '../game-session/game-session.entity';

@Entity()
export class Player {
  @PrimaryColumn('varchar', { length: 128 })
  playerCode: string

  @ManyToOne(() => Currency, (currency) => currency.players)
  @JoinColumn({ name: 'currency_code', referencedColumnName: 'currencyCode' })
  currency: Currency

  @ManyToOne(() => Language, (language) => language.players)
  @JoinColumn({ name: 'language', referencedColumnName: 'language' })
  language: Language

  @ManyToOne(() => Country, (country) => country.players)
  @JoinColumn({ name: 'country', referencedColumnName: 'country' })
  country: Country

  @OneToMany(() => GameSession, (gameSession) => gameSession.player)
  gameSessions: GameSession[]

  @Column({ length: 256 })
  username: string
}
