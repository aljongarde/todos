import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(
        @Inject('USER_SERVICE') private readonly usersService: UserService, 
        private jwtService: JwtService,
        private dataSource: DataSource) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findUser(email);

        if (user && user.password === password){
            const { password, email, ...rest} = user;
            return rest;
        }
        else{
            return null;
        }
        
    }

    async login(user: any) {

        const userdetails = this.validateUser(user.email, user.password);
        
        if(userdetails){
            const userdetails = await this.dataSource
            .getRepository(UserEntity)
            .createQueryBuilder("users")
            .where("users.email = :email", { email: user.email })
            .getOne();
            //const payload = { user: userdetails };
            const payload = { user: userdetails };
            return {
                access_token: this.jwtService.sign(payload),
                user: userdetails
            };
        }
        /*
        const payload = { name: user.email, sub: user.user_id};
        return {
            access_token: this.jwtService.sign(payload)
        };
        */
    }

}
