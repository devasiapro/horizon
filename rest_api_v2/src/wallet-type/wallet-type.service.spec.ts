import { Test, TestingModule } from '@nestjs/testing';
import { WalletTypeService } from './wallet-type.service';

describe('WalletTypeService', () => {
  let service: WalletTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletTypeService],
    }).compile();

    service = module.get<WalletTypeService>(WalletTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
