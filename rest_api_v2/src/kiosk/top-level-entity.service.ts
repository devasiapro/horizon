import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TopLevelEntity } from './top-level-entity.entity';

@Injectable()
export class TopLevelEntityService {
  public constructor(
    @Inject('TOP_LEVEL_ENTITY_REPOSITORY')
    private topLevelEntityRepository: Repository<TopLevelEntity>,
  ) {}

  public async findByName(name: string): Promise<TopLevelEntity> {
    const topLevelEntity = await this.topLevelEntityRepository.findOneBy({ name });
    return topLevelEntity;
  }

  public async store(topLevelEntity: TopLevelEntity): Promise<TopLevelEntity> {
    await this.topLevelEntityRepository.save(topLevelEntity);
    return topLevelEntity;
  }
}
