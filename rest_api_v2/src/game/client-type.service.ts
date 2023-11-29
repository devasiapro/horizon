import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ClientType } from './client-type.entity';

@Injectable()
export class ClientTypeService {
  public constructor(
    @Inject('CLIENT_TYPE_REPOSITORY')
    private clientTypeRepository: Repository<ClientType>,
  ) {}

  public async findByName(clientTypeName: string): Promise<ClientType> {
    const clientType = await this.clientTypeRepository.findOneBy({ name: clientTypeName });
    return clientType;
  }

  public async store(clientType: ClientType): Promise<ClientType> {
    await this.clientTypeRepository.save(clientType);
    return clientType;
  }
}
