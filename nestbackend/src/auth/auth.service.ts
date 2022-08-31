import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
        //console.log(user, email, password);
        
        if (user && user.password == password){
            return true;
        }
        else{
            return false;
        }
        
    }

    async loginUser(userdata: any) {

        const userdetails = await this.usersService.findUser(userdata.email);
        const isMatched = await this.validateUser(userdata.email,userdata.password);
        
        if(userdetails){

            if(isMatched){
                
                const payload = { user: userdetails };
                
                return {
                    access_token: this.jwtService.sign(payload),
                    user: userdetails,
                    status: HttpStatus.FOUND
                };

            }
            else{
                return new HttpException('Password do not match', HttpStatus.NOT_FOUND);
            }

        }
        else{
            return new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        
    }

}
