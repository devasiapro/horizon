import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginRequestDto } from './dto/login-request.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  public async login(loginRequest: LoginRequestDto): Promise<{ token: string, user: User }> {
    const { username, password } = loginRequest;
    const user = await this.userService.findByUsername(username);
    console.log('user', user);
    if (!user) {
      throw new UnauthorizedException('Please check your login credentials.');
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    if (user && isValid) {
      const payload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      user.password = null;
      return {  
        token: accessToken,
        user: user 
      };
    }
    throw new UnauthorizedException('Please check your login credentials.');
  } 
}
