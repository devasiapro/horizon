import { Module } from '@nestjs/common';
import { CustomerModule } from '../customer/customer.module';
import { InstanceModule } from '../instance/instance.module';
import { GameSessionModule } from '../game-session/game-session.module';
import { GameFetcher } from './game-fetcher';
import { DragonSharedSeederService } from './dragon-shared-seeder.service';

@Module({
  providers: [DragonSharedSeederService, GameFetcher],
  imports: [CustomerModule, InstanceModule, GameSessionModule]
})
export class CommandModule {}
