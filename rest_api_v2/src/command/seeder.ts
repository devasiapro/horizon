import { Command, CommandRunner, Option } from 'nest-commander';
import { Role } from '../user/role.entity';
import { RoleService } from '../user/role.service';

@Command({
  name: 'seeder',
  arguments: '',
  description: '',
  options: {}
})
export class Seeder extends CommandRunner {

  public constructor(
    private roleService: RoleService
  ) {
    super();
  }

  public async run(inputs: string[], options?: Record<string, any>): Promise<void> {
    const role = new Role();
    role.role = 'admin';
    await this.roleService.store(role);
    process.exit();
  }
}
