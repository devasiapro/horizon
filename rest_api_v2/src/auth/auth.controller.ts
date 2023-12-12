import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {

  public constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Post('/login')
  public async login(
    @Body() loginRequest: LoginRequestDto
  ): Promise<{ token: string, user: User }> {
    return await this.authService.login(loginRequest);
  } 

  @Post('/logout')
  public async logout(): Promise<void> {

  }

  @Post('/')
  @UseGuards(AuthGuard())
  public async auth(@Req() req): Promise<{ token: string, user: User }> {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return {
      token: refreshToken,
      user: req.user
    };
  }
}
