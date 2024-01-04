import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { ReportController } from './report.controller';
import { GameSessionModule } from '../game-session/game-session.module';

@Module({
  imports: [DatabaseModule, AuthModule, GameSessionModule],
  controllers: [ReportController]
})
export class ReportModule {}
