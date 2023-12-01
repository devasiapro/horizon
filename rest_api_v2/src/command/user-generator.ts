import { Command, CommandRunner, Option } from 'nest-commander';
import { User } from '../user/user.entity';
import { Role } from '../user/role.entity';
import { RoleService } from '../user/role.service';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

interface CommandOptions {
  username: string;
  password: string;
}

@Command({
  name: 'user-generator',
  arguments: '',
  description: '',
  options: {}
})
export class UserGenerator extends CommandRunner {

  public constructor(
    private userService: UserService,
    private roleService: RoleService
  ) {
    super();
  }

  @Option({
    flags: '-u, --username [username]',
    description: 'The username.'
  })
  public parseUsername(val: string): string {
    return val;
  }

  @Option({
    flags: '-p, --password [password]',
    description: 'The password.'
  })
  public parsePassword(val: string): string {
    return val;
  }

  public async run(inputs: string[], options?: CommandOptions): Promise<void> {
    const { username, password } = options;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const role = await this.roleService.findByRole('admin');
    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.role = role;
    await this.userService.store(user);
    process.exit();
  }
}
