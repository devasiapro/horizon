import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ClientPlatform } from './client-platform.entity';

@Injectable()
export class ClientPlatformService {
  public constructor(
    @Inject('CLIENT_PLATFORM_REPOSITORY')
    private clientPlatformRepository: Repository<ClientPlatform>,
  ) {}

  public async findByName(clientPlatformName: string): Promise<ClientPlatform> {
    const clientPlatform = await this.clientPlatformRepository.findOneBy({ 
      name: clientPlatformName 
    });
    return clientPlatform;
  }

  public async store(clientPlatform: ClientPlatform): Promise<ClientPlatform> {
    await this.clientPlatformRepository.save(clientPlatform);
    return clientPlatform;
  }
}
