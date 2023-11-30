import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Instance } from './instance.entity';

@Injectable()
export class InstanceService {
  public constructor(
    @Inject('INSTANCE_REPOSITORY')
    private instanceRepository: Repository<Instance>,
  ) {}

  public async findByName(name: string): Promise<Instance> {
    const instance = await this.instanceRepository.findOneBy({ name });
    return instance;
  }

  public async store(instance: Instance): Promise<Instance> {
    await this.instanceRepository.save(instance);
    return instance;
  }
}



