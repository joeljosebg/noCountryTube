import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Req,
  Body,
} from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { ApiBasicAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from '../dtos/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOkResponse({
    description: 'Returns the token has been successfully created.',
  })
  login(@Request() req, @Body() loginDto: LoginDto) {
    console.log({ req, loginDto });
    return this.authService.login(req.user);
  }

  @Post('refresh')
  @ApiOkResponse({
    description: 'Returns the token has been successfully created.',
  })
  async refresh(@Request() req, @Body() tokenDto: RefreshTokenDto) {
    const refreshResult = await this.authService.refresh(tokenDto.refreshToken);

    return refreshResult;
  }
}
