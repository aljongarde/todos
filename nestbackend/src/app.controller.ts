import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req): string {
    return req.user; // TODO: require an Bearer token
  }


}

