import { Controller, Request, Post, UseGuards, Get, Req, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard'; 
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
 
  @Post('login')
  login(@Body() user) {
    console.log(user);
    return this.authService.login(user);
  }
}
