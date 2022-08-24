import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  getHello(@Request() req): string {
    
    return req.user; // TODO: require an Bearer token
  }

  //@UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() req): any {
    //return {msg: 'Logged in!'}; // TODO: return JWT access token
    //return req.user;
    
    return this.authService.login(req);
  }

}

