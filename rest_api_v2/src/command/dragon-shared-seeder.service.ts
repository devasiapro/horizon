import { Injectable } from '@nestjs/common';
import { DragonSharedResponseDto } from './dto/dragon-shared-response.dto';
import { CustomerService } from '../customer/customer.service';
import { InstanceService } from '../instance/instance.service';
import { GameSessionService } from '../game-session/game-session.service';
import { Customer } from '../customer/customer.entity';
import { Instance } from '../instance/instance.entity';
import { GameSession } from '../game-session/game-session.entity';

@Injectable()
export class DragonSharedSeederService {
  private gameSessions: DragonSharedResponseDto[] = [];

  public constructor(
    private customerService: CustomerService,
    private instanceService: InstanceService,
    private gameSessionService: GameSessionService
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

      let instance = await this
        .instanceService
        .findByName(gameSession.casino);

      if (!instance) {
        instance = new Instance();
      } 
      instance.name = gameSession.casino;
      instance = await this.instanceService.store(instance);

      let customer = await this
        .customerService
        .findByBrandName(gameSession.casino);

      if (!customer) {
        customer = new Customer();
      }
      customer.brandName = gameSession.casino;
      customer.instance = instance;
      customer = await this.customerService.store(customer);

      let gameSessionModel = new GameSession();
      gameSessionModel.totalIncome = Number(gameSession.totalincome);
      gameSessionModel.customer = customer;
      gameSessionModel = await this.gameSessionService.store(gameSessionModel);
    }
  }
}
