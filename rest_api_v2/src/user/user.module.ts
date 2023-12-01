import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.providers';
import { roleProviders } from './role.providers';
import { UserService } from './user.service';
import { RoleService } from './role.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...userProviders,
    ...roleProviders,
    UserService,
    RoleService
  ],
  exports: [UserService, RoleService]
})
export class UserModule {}
