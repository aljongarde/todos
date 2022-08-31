import { Column, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    getHello(): string {
        return 'Hello World!';
      }

    registerUser(user: UserEntity): Promise<UserEntity>{
      return this.userRepository.save(user);
    }

    findUser(email:string): Promise<UserEntity>{
      const response = this.userRepository.findOneBy({email});
      return response;
    }


    /*
    async findOne(email: string): Promise<UserEntity | undefined>{
      return this.userRepository.findOne(user => user.email === email);
    }
    */

}
