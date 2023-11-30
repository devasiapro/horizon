import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Kiosk } from './kiosk.entity';

@Injectable()
export class KioskService {
  public constructor(
    @Inject('KIOSK_REPOSITORY')
    private kioskRepository: Repository<Kiosk>,
  ) {}

  public async findByName(name: string): Promise<Kiosk> {
    const kiosk = await this.kioskRepository.findOneBy({ name });
    return kiosk;
  }

  public async store(kiosk: Kiosk): Promise<Kiosk> {
    await this.kioskRepository.save(kiosk);
    return kiosk;
  }
}
