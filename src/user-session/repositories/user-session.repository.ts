import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "../../repositories/base/base.abstract.repository";
import { CreateUserSessionDto } from "../dto/create-user-session.dto";
import { UpdateUserSessionDto } from "../dto/update-user-session.dto";
import { UserSession } from "../entities/user-session.entity";
import { UserSessionRepositoryInterface } from "../interfaces/user-session.repository.interface";

@Injectable()
export class UserSessionRepository  extends BaseAbstractRepository<UserSession> 
implements UserSessionRepositoryInterface{
    constructor(@InjectRepository(UserSession) private readonly userSessionRepository:Repository<UserSession>){
        super(userSessionRepository)
    }
    async createOne(userSessionDto: CreateUserSessionDto): Promise<UserSession> {
        try {
            return this.userSessionRepository.save(Object.assign(userSessionDto));
        } catch (e) {
            throw new HttpException(
            'SESSION_CREATION_FAILED',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
        }
    }
    
    async updateOne(
        updateUserSessionDto: UpdateUserSessionDto,
    ): Promise<UserSession> {
        try {
            return this.userSessionRepository.save(
            Object.assign(updateUserSessionDto),
        );
        } catch (error) {
            throw new HttpException(
            'SESSION_UPDATION_FAILED',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
        }
    }
}