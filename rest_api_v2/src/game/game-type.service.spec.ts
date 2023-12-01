import { Test, TestingModule } from '@nestjs/testing';
import { GameTypeService } from './game-type.service';

describe('GameTypeService', () => {
  let service: GameTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameTypeService],
    }).compile();

    service = module.get<GameTypeService>(GameTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
