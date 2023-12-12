import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(private userService: UserService) {
    super({
      secretOrKey: process.env.AUTH_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  public async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.userService.findByUsername(username);
    user.password = null;
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
