import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export interface UserRepositoryInterface extends BaseInterfaceRepository<User> {
    createOne(createUserDto:CreateUserDto):Promise<User>;
}