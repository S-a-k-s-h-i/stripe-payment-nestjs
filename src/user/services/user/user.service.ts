import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { UserRepositoryInterface } from '../../interfaces/user.repository.interface';
import { UserServiceInterface } from '../../interfaces/user.service.interface';

@Injectable()
export class UserService implements UserServiceInterface{
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository:UserRepositoryInterface
  ){}

  /**
   * Method to create new User
   * @param createUserDto contains data to create user
   * @returns User
   */
  async createUser(createUserDto: CreateUserDto):Promise<User>{
    const newUser = await this.userRepository.createOne(createUserDto);
    return <User>{
      id:newUser.id
    }
  }


}
