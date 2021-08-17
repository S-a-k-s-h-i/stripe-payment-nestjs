import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "../../../repositories/base/base.abstract.repository";
import { CreateUserDto } from "../../dto/create-user.dto";
import { User } from "../../entities/user.entity";
import { UserRepositoryInterface } from "../../interfaces/user.repository.interface";

@Injectable()
export class UserRepository extends BaseAbstractRepository<User>
implements UserRepositoryInterface
{
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>,
    ){
        super(userRepository);
    }

    /**
   * Method to create new user
   * @param createUserDto Contains data to create user
   * @returns User
   */
    async createOne(
    createUserDto: CreateUserDto,
    ): Promise<User> {
        return this.userRepository.create(createUserDto);
    }
    
}