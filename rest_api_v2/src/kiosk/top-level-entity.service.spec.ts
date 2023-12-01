import { Test, TestingModule } from '@nestjs/testing';
import { TopLevelEntityService } from './top-level-entity.service';

describe('TopLevelEntityService', () => {
  let service: TopLevelEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopLevelEntityService],
    }).compile();

    service = module.get<TopLevelEntityService>(TopLevelEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
