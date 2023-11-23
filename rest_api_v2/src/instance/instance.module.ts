import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { instanceProviders } from './instance.providers';
import { InstanceService } from './instance.service';
import { Instance } from './instance.entity';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...instanceProviders,
    InstanceService
  ],
  exports: [InstanceService]
})
export class InstanceModule {}
