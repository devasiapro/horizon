import { 
  Controller, 
  Query,
  Res,
  UseGuards,
  Get 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { GameSessionFindQueryDto } from './game-session-find-query.dto';
import { GameSessionService } from './game-session.service';

@Controller('game-session')
export class GameSessionController {

  public constructor(private gameSessionService: GameSessionService) {}

  @Get('')
  @UseGuards(AuthGuard())
  public async find( 
    @Query() query: GameSessionFindQueryDto,
    @Res() res: Response
  ) { 
    const startDate = query.start_date;
    const endDate = query.end_date;
    const gameSessions = await this.gameSessionService.findAll(startDate, endDate);
    console.log('gameSessions', gameSessions);
    return res.status(200).json(gameSessions);
  }
}
