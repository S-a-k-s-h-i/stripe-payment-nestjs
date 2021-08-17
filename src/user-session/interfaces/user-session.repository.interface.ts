import { BaseInterfaceRepository } from "../../repositories/base/base.interface.repository";
import { CreateUserSessionDto } from "../dto/create-user-session.dto";
import { UpdateUserSessionDto } from "../dto/update-user-session.dto";
import { UserSession } from "../entities/user-session.entity";

export interface UserSessionRepositoryInterface extends BaseInterfaceRepository<UserSession> {
    createOne(userSessionDto: CreateUserSessionDto): Promise<UserSession> ;
    updateOne(updateUserSessionDto: UpdateUserSessionDto,): Promise<UserSession> 
}