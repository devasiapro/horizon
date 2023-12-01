import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { topLevelEntityProviders } from './top-level-entity.providers';
import { TopLevelEntityService } from './top-level-entity.service';
import { TopLevelEntity } from './top-level-entity.entity';
import { KioskService } from './kiosk.service';
import { kioskProviders } from './kiosk.providers';
import { Kiosk } from './kiosk.entity';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...topLevelEntityProviders,
    ...kioskProviders,
    TopLevelEntityService,
    KioskService
  ],
  exports: [TopLevelEntityService, KioskService]
})
export class KioskModule {}
