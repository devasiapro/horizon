import { Test, TestingModule } from '@nestjs/testing';
import { DragonSharedSeederService } from './dragon-shared-seeder.service';
import { GameFetcher } from './game-fetcher';
import { CustomerModule } from '../customer/customer.module';
import { InstanceModule } from '../instance/instance.module';
import { GameSessionModule } from '../game-session/game-session.module';

describe('DragonSharedSeederService', () => {
  let service: DragonSharedSeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DragonSharedSeederService, GameFetcher],
      imports: [CustomerModule, InstanceModule, GameSessionModule]
    }).compile();

    service = module.get<DragonSharedSeederService>(DragonSharedSeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should store the data in correct tables', () => {
  });
});
