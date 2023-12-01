import { Test, TestingModule } from '@nestjs/testing';
import { ClientPlatformService } from './client-platform.service';

describe('ClientPlatformService', () => {
  let service: ClientPlatformService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientPlatformService],
    }).compile();

    service = module.get<ClientPlatformService>(ClientPlatformService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
