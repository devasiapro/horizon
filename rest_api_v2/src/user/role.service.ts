import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  public constructor(
    @Inject('ROLE_REPOSITORY')
    private roleRepository: Repository<Role>,
  ) {}

  public async findByRole(role: string): Promise<Role> {
    return await this.roleRepository.findOneBy({ role }); 
  }

  public async store(role: Role): Promise<Role> {
    await this.roleRepository.save(role);
    return role;
  }
}
