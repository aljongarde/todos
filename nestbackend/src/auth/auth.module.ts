import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([UserEntity]), JwtModule.register({
    secret: 'SECRET', //put in env vars
    signOptions: { expiresIn: '60s' },
  })],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
  {
    provide: 'USER_SERVICE',
    useClass: UserService
  }],
  exports : [AuthService],
  controllers: [AuthController]
})

export class AuthModule {}
