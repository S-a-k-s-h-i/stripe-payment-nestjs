import { Controller, Get,Request, Post, Body, Inject } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UserServiceInterface } from '../../interfaces/user.service.interface';
import { User } from '../../entities/user.entity';

@Controller('user')
export class UserController {
  constructor(
    @Inject('UserServiceInterface')
    private readonly userService:UserServiceInterface
  ) {}
  
  /**
   * API to create new user
   * @param createUserDto contains data to create user 
   * @returns user
   */
  @Post('signup')
  create(@Body() createUserDto: CreateUserDto):Promise<User>{
    return this.userService.createUser(createUserDto)
  }

  @Get('profile')
  getProfile(@Request() req){
    return req.user
  }

}
