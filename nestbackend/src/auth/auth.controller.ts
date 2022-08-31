import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from './authenticated.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    //@UseGuards(LocalAuthGuard)
    @Post('login')
    async loginUser(@Request() req) {
    //return {msg: 'Logged in!'}; // TODO: return JWT access token
    //return req.user;
    return this.authService.loginUser(req.body);
    }

}
