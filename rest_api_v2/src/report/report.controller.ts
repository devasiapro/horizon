import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { GameSessionService } from '../game-session/game-session.service';
import { ReportQueryDto } from './report-query.dto';

@Controller('report')
export class ReportController {

  public constructor(private gameSessionService: GameSessionService) {}

  @Get('/kpi')
  @UseGuards(AuthGuard())
  public async fetchKpi( 
    @Query() query: ReportQueryDto,
    @Res() res: Response
  ) {
    const startDate = query.start_date;
    const endDate = query.end_date;
    const gameSessions = await this.gameSessionService.findAll(startDate, endDate);

    const totalWins = gameSessions
      .reduce((sum, current) => sum + Number(current.totalGameWins), 0);

    const totalBets = gameSessions
      .reduce((sum, current) => sum + Number(current.totalGameBets), 0);

    const kpi = {
      ggr: gameSessions
        .reduce((sum, current) => sum + Number(current.totalIncome), 0),
      total_bets: totalBets,
      total_players: gameSessions
        .reduce((sum, current) => sum + Number(current.playersCount), 0),
      rtp: totalWins / totalBets,
      bet_count: gameSessions
        .reduce((sum, current) => sum + Number(current.gamesCount), 0)
    };
    return res.status(200).json(kpi);
  }

  // STUB: Currently handles /ggr only.
  @Get('/distribution/:indicator')
  @UseGuards(AuthGuard())
  public async fetchDistributionReport(
    @Query() query: ReportQueryDto,
    @Res() res: Response
  ) {
    const startDate = query.start_date;
    const endDate = query.end_date;
    const gameSessions = await this.gameSessionService.findAll(startDate, endDate);

    const gameTypeCategories = {
      'Live Games': 0,
      'Slot Machines': 0,
      'Progressive Slot Machines': 0 
    };
    gameSessions.forEach(gameSession => {
      if (gameSession.game.gameType.name in gameTypeCategories) {
        gameTypeCategories[gameSession.game.gameType.name] += Number(gameSession.totalIncome);
      }
    });
    return res.status(200).json(gameTypeCategories);
  }

  // STUB: Currently handles /ggr only.
  @Get('/daily/:indicator')
  @UseGuards(AuthGuard())
  public async fetchDailyReport(
    @Query() query: ReportQueryDto,
    @Res() res: Response
  ) {
    const startDate = query.start_date;
    const endDate = query.end_date;
    const gameSessions = await this.gameSessionService.findAll(startDate, endDate);
    const report = {};
    gameSessions.forEach((gameSession) => {
      report[gameSession.datePlayed] = 0;
    });
    gameSessions.forEach(gameSession => {
      report[gameSession.datePlayed] += Number(gameSession.totalIncome);
    });
    return res.status(200).json(report);
  }

  // STUB: Currently handles /country/ggr only.
  @Get('/rank')
  @UseGuards(AuthGuard())
  public async fetchReportPerCategoryAndIndicator(
    @Query() query: ReportQueryDto,
    @Res() res: Response
  ) {
    const startDate = query.start_date;
    const endDate = query.end_date;
    const category = query.category;
    const indicator = query.indicator;

    const gameSessions = await this.gameSessionService.findAll(startDate, endDate);
    const categories = {};

    gameSessions.forEach((gameSession) => {
      let key = gameSession.player.countryName;
      if (category == "customer") {
        if (!gameSession.customer) {
          return;
        }
        key = gameSession.customer.brandName;
      }
      if (category == "product") {
        key = gameSession.game.name;
      }
      categories[key] = 0;
    });
    gameSessions.forEach((gameSession) => {
      let key = gameSession.player.countryName;
      if (category == "customer") {
        if (!gameSession.customer) {
          return;
        }
        key = gameSession.customer.brandName;
      }
      if (category == "product") {
        key = gameSession.game.name;
      }
      categories[key] += Number(gameSession.totalIncome);
    });
    return res.status(200).json(categories);
  }

  @Get('/game-earning')
  public fetchGameEarning() {
    return [];
  }

  @Get('/customer-income')
  public fetchCustomerIncome() {
    return [];
  }

  @Get('/product-income')
  public fetchProductIncome() {
    return [];
  }
  
  @Get('/country-income')
  public fetchCountryIncome() {
    return [];
  }
}
