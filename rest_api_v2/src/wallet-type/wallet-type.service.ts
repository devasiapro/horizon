import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WalletType } from './wallet-type.entity';

@Injectable()
export class WalletTypeService {
  public constructor(
    @Inject('WALLET_TYPE_REPOSITORY')
    private walletTypeRepository: Repository<WalletType>,
  ) {}

  public async store(walletType: WalletType): Promise<WalletType> {
    await this.walletTypeRepository.save(walletType);
    return walletType;
  }

  public async findById(walletTypeId: number): Promise<WalletType> {
    const walletType = await this.walletTypeRepository.findOneBy({ id: walletTypeId });
    return walletType;
  }
}
