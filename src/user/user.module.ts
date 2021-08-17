import { Module } from '@nestjs/common';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import {  UserRepository } from './repositories/user/user.repository';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide:'UserServiceInterface',
      useClass:UserService
    },
    {
      provide:'UserRepositoryInterface',
      useClass:UserRepository
    }
  ],
  exports:[
    {
      provide:'UserServiceInterface',
      useClass:UserService
    },
  ]
})
export class UserModule {}
