import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { TodoModule } from './todo/todo.module';
import { TodoEntity } from './todo/todo.entity';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([UserEntity,TodoEntity]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'todoapp',
      entities: [UserEntity,TodoEntity],
      synchronize: false,
    }),
    AuthModule,
    TodoModule
  ],
  controllers: [UserController,AppController,TodoController,AuthController],
  providers: [AppService, UserService,TodoService],
})
export class AppModule {}
