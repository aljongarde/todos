import { UserService } from './user.service';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {

    }

    @Post('register')
    async registerUser(@Body() createUserOto: UserEntity){
        const response = await this.userService.registerUser(createUserOto);
        return response;
    }

}
