import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        @Inject('USER_SERVICE') private readonly usersService: UserService, 
        private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findUser(email);

        if (user && user.password === password){
            const { password, email, ...rest} = user;
            return rest;
        }

        return null;
    }

    async login(user: any) {

        if(this.validateUser(user.email, user.password)){
            const payload = { name: 'ALJON', sub: 1};
            return {
                access_token: this.jwtService.sign(payload)
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
