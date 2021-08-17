import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";

export interface UserServiceInterface {
    createUser(createUserDto: CreateUserDto):Promise<User>;
}