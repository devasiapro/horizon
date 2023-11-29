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
import { Kiosk } from '../kiosk/kiosk.entity';
import { Player } from '../player/player.entity';
import { Currency } from '../currency/currency.entity';
import { Game } from '../game/game.entity';
import { Language } from '../language/language.entity';

@Entity()
export class GameSession {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Kiosk, (kiosk) => kiosk.gameSessions)
  kiosk: Kiosk;

  @ManyToOne(() => Player, (player) => player.gameSessions)
  @JoinColumn({ name: 'player_code', referencedColumnName: 'playerCode' })
  player: Player;

  @ManyToOne(() => Currency, (currency) => currency.gameSessions)
  @JoinColumn({ name: 'currency_code', referencedColumnName: 'currencyCode' })
  currency: Currency;

  @ManyToOne(() => Language, (language) => language.gameSessions)
  @JoinColumn({ name: 'language', referencedColumnName: 'language' })
  language: Language;

  @Column({ type: 'date' })
  datePlayed: string;

  @ManyToOne(() => Game, (game) => game.gameSessions)
  game: Game;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  maximumRtp: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  freeSpinWin: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  associatedGoldenChipsWin: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  autoplayBets: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  autoplayProgressiveBets: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  autoplayProgressiveWins: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  autoplayWins: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  averageBets: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  bonusBets: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  bonusMoneyLiveGameTips: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  bonusWins: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  comps: number;

  @Column({ type: 'int', nullable: true })
  daysPlayed: number;

  @Column({ type: 'int', nullable: true })
  deductedGoldenChip: number;

  @Column({ type: 'int', nullable: true })
  freeSpinBet: number;

  @Column({ type: 'int', nullable: true })
  freeSpinCount: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  netPayout: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  gameIncomeShare: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  gamesCount: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  goldenChipBet: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  goldenChipWin: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  overallGamePayout: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  playersCount: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  jackpotBets: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  jackpotWins: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  realHold: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  realBets: number;
  
  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  realMoneyIncome: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  realMoneyLiveGameTips: number;
  
  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  realPayout: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  realJackpotWins: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  realWins: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  returnedGoldenChips: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  totalBets: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  totalGameBets: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  totalGameWins: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  totalIncome: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  refund: number;

  @Column({ type: 'decimal', precision: 19, scale: 4, nullable: true })
  totalPlayerWins: number;
}
