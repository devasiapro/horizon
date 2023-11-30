import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  public constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  public async findByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ username });
  }

  public async store(user: User): Promise<User> {
    await this.userRepository.save(user);
    return user;
  }
}
