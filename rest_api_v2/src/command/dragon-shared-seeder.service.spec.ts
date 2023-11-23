import { Test, TestingModule } from '@nestjs/testing';
import { DragonSharedSeederService } from './dragon-shared-seeder.service';

describe('DragonSharedSeederService', () => {
  let service: DragonSharedSeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DragonSharedSeederService],
    }).compile();

    service = module.get<DragonSharedSeederService>(DragonSharedSeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
