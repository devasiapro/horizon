import { Test, TestingModule } from '@nestjs/testing';
import { FlyingDragonSeederService } from './flying-dragon-seeder.service';

describe('FlyingDragonSeederService', () => {
  let service: FlyingDragonSeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlyingDragonSeederService],
    }).compile();

    service = module.get<FlyingDragonSeederService>(FlyingDragonSeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
