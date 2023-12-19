import { Command, CommandRunner, Option } from 'nest-commander';
import { Role } from '../user/role.entity';
import { RoleService } from '../user/role.service';
import { WalletType } from '../wallet-type/wallet-type.entity';
import { WalletTypeService } from '../wallet-type/wallet-type.service';

@Command({
  name: 'initializer',
  arguments: '',
  description: '',
  options: {}
})
export class Initializer extends CommandRunner {
  public constructor(
    private walletTypeService: WalletTypeService,
    private roleService: RoleService
  ) {
    super(); 
  }

  public async run(inputs: string[], options?: {}): Promise<void> {
    await this.store('seamless');
    await this.store('transfer');
    const role = new Role();
    role.role = 'admin';
    await this.roleService.store(role);
    process.exit();
  }

  private async store(walletTypeName: string): Promise<void> {
    const walletType = new WalletType();
    walletType.name = walletTypeName;
    await this.walletTypeService.store(walletType);
  }
}
