import { Injectable } from '@nestjs/common';
import { DragonSharedResponseDto } from './dto/dragon-shared-response.dto';
import { CustomerService } from '../customer/customer.service';
import { InstanceService } from '../instance/instance.service';
import { GameService } from '../game/game.service';
import { GameSessionService } from '../game-session/game-session.service';
import { CompanyService } from '../company/company.service';
import { ClientTypeService } from '../game/client-type.service';
import { ClientPlatformService } from '../game/client-platform.service';
import { GameTypeService } from '../game/game-type.service';
import { LanguageService } from '../language/language.service';
import { CountryService } from '../country/country.service';
import { CurrencyService } from '../currency/currency.service';
import { PlayerService } from '../player/player.service';
import { KioskService } from '../kiosk/kiosk.service';
import { TopLevelEntityService } from '../kiosk/top-level-entity.service';
import { Customer } from '../customer/customer.entity';
import { Instance } from '../instance/instance.entity';
import { Company } from '../company/company.entity';
import { Game } from '../game/game.entity';
import { ClientType } from '../game/client-type.entity';
import { ClientPlatform } from '../game/client-platform.entity';
import { GameType } from '../game/game-type.entity';
import { GameSession } from '../game-session/game-session.entity';
import { Language } from '../language/language.entity';
import { Currency } from '../currency/currency.entity';
import { Country } from '../country/country.entity';
import { Player } from '../player/player.entity';
import { Kiosk } from '../kiosk/kiosk.entity';
import { TopLevelEntity } from '../kiosk/top-level-entity.entity';

@Injectable()
export class DragonSharedSeederService {
  private gameSessions: DragonSharedResponseDto[] = [];

  public constructor(
    private customerService: CustomerService,
    private instanceService: InstanceService,
    private gameSessionService: GameSessionService,
    private companyService: CompanyService,
    private gameService: GameService,
    private clientTypeService: ClientTypeService,
    private clientPlatformService: ClientPlatformService,
    private gameTypeService: GameTypeService,
    private languageService: LanguageService,
    private currencyService: CurrencyService,
    private countryService: CountryService,
    private playerService: PlayerService,
    private kioskService: KioskService,
    private topLevelEntityService: TopLevelEntityService
  ) {}

  public setGameSessions(gameSessions: DragonSharedResponseDto[]): void {
    this.gameSessions = gameSessions;
  }

  public async process(): Promise<void> {
    if (this.gameSessions.length <= 0) {
      return;
    }
    for (let i = 0; i < this.gameSessions.length; i++) {
      const gameSession = this.gameSessions[i];

      let company = await this
        .companyService
        .findByName(gameSession.company);

      if (!company) {
        company = new Company();
      }

      company.name = gameSession.company;
      company = await this.companyService.store(company);

      let instanceName = gameSession.casino;
      /** STUB: set to torrospin for now.
      if (instanceName === 'torrospin') {
        instanceName = gameSession.username.split('_')[1];
      }
      **/

      let instance = await this
        .instanceService
        .findByName(instanceName);

      if (!instance) {
        instance = new Instance();
      } 
      instance.name = instanceName;
      instance.company = company;
      instance = await this.instanceService.store(instance);

      let topLevelEntity: TopLevelEntity;

      let clientType = await this
        .clientTypeService
        .findByName(gameSession.clienttype);

      if (!clientType) {
        clientType = new ClientType();
        clientType.name = gameSession.clienttype;
        clientType = await this.clientTypeService.store(clientType);
      }

      let clientPlatform = await this
        .clientPlatformService
        .findByName(gameSession.clientplatform);

      if (!clientPlatform) {
        clientPlatform = new ClientPlatform();
        clientPlatform.name = gameSession.clientplatform;
        clientPlatform = await this.clientPlatformService.store(clientPlatform);
      }

      let gameType = await this
        .gameTypeService
        .findByName(gameSession.gametype);

      if (!gameType) {
        gameType = new GameType();
        gameType.name = gameSession.gametype;
        gameType = await this.gameTypeService.store(gameType);
      }

      let game = await this
        .gameService
        .findByName(gameSession.gamename);

      if (!game) {
        game = new Game();
        game.name = gameSession.gamename;
      }

      game.clientType = clientType;
      game.clientPlatform = clientPlatform;
      game.gameType = gameType;
      game = await this.gameService.store(game);

      let language = await this
        .languageService
        .findByLanguage(gameSession.language);

      if (!language) {
        language = new Language();
        language.language = gameSession.language;
      }

      language = await this.languageService.store(language);

      let country = await this
        .countryService
        .findByCountry(gameSession.country);

      if (!country) {
        country = new Country();
        country.country = gameSession.country;
      }

      country = await this.countryService.store(country);

      let currency = await this
        .currencyService
        .findByCurrencyCode(gameSession.playercurrency);

      if (!currency) {
        currency = new Currency();
        currency.currencyCode = gameSession.playercurrency;
      }

      currency = await this.currencyService.store(currency);

      let player = await this
        .playerService
        .findByPlayerCode(gameSession.playercode);

      if (!player) {
        player = new Player();
        player.playerCode = gameSession.playercode;
      }
      player.currency = currency;
      player.language = language;
      player.country = country;
      player.username = gameSession.username;

      player = await this.playerService.store(player);

      const gameSessionModel = new GameSession();
      gameSessionModel.instance = instance;
      gameSessionModel.player = player;
      gameSessionModel.currency = currency;
      gameSessionModel.language = language;
      gameSessionModel.currency = currency;
      gameSessionModel.datePlayed = gameSession.date1;
      gameSessionModel.game = game;
      gameSessionModel.maximumRtp = Number(gameSession.maximumrtp);
      gameSessionModel.freeSpinWin = Number(gameSession.freespinwin);
      gameSessionModel.associatedGoldenChipsWin = Number(gameSession.associatedgoldenchipswins);
      gameSessionModel.autoplayBets = Number(gameSession.autoplaybets);
      gameSessionModel.autoplayProgressiveBets = Number(gameSession.autoplayprogressivebets);
      gameSessionModel.autoplayProgressiveWins = Number(gameSession.autoplayproressivewins);
      gameSessionModel.autoplayWins = Number(gameSession.autoplaywins);
      gameSessionModel.averageBets = Number(gameSession.avgbets);
      gameSessionModel.bonusBets = Number(gameSession.bonusbets);
      gameSessionModel.bonusMoneyLiveGameTips = Number(gameSession.bonusmoneylivegametips);
      gameSessionModel.bonusWins = Number(gameSession.bonuswins);
      gameSessionModel.comps = Number(gameSession.comps);
      gameSessionModel.daysPlayed = Number(gameSession.daysplayed);
      gameSessionModel.deductedGoldenChip = Number(gameSession.deductedgoldenchip);
      gameSessionModel.freeSpinBet = Number(gameSession.freespinbet);
      gameSessionModel.freeSpinCount = Number(gameSession.freespincount);
      gameSessionModel.netPayout = Number(gameSession.netpayout);
      gameSessionModel.gameIncomeShare = Number(gameSession.gincomeshare);
      gameSessionModel.gamesCount = Number(gameSession.gamescnt);
      gameSessionModel.goldenChipBet = Number(gameSession.goldenchipbet);
      gameSessionModel.goldenChipWin = Number(gameSession.goldenchipwin);
      gameSessionModel.overallGamePayout = Number(gameSession.overallgamepayout);
      gameSessionModel.playersCount = Number(gameSession.playerscnt);
      gameSessionModel.jackpotBets = Number(gameSession.jackpotbets);
      gameSessionModel.jackpotWins = Number(gameSession.jackpotwins);
      gameSessionModel.realHold = Number(gameSession.real_hold);
      gameSessionModel.realBets = Number(gameSession.realbets);
      gameSessionModel.realMoneyIncome = Number(gameSession.realmoneyincome);
      gameSessionModel.realMoneyLiveGameTips = Number(gameSession.realmoneylivegametips);
      gameSessionModel.realPayout = Number(gameSession.realpayout);
      gameSessionModel.realJackpotWins = Number(gameSession.realjackpotwins);
      gameSessionModel.realWins = Number(gameSession.realwins);
      gameSessionModel.returnedGoldenChips = Number(gameSession.returnedgoldenchips);
      gameSessionModel.totalBets = Number(gameSession.totalbets);
      gameSessionModel.totalGameBets = Number(gameSession.totalgamebets);
      gameSessionModel.totalGameWins = Number(gameSession.totalgamewins);
      gameSessionModel.totalIncome = Number(gameSession.totalincome);
      gameSessionModel.refund = Number(gameSession.refund);
      gameSessionModel.totalPlayerWins = Number(gameSession.totalplayerwins);
      await this.gameSessionService.store(gameSessionModel);
    }
  }
}
