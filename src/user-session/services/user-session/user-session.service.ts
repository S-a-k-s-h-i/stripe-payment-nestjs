import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DeleteResult } from 'typeorm';
import { User } from '../../../user/entities/user.entity';
import { UserSession } from '../../entities/user-session.entity';
import { UserSessionRepositoryInterface } from '../../interfaces/user-session.repository.interface';
import { UserSessionServiceInterface } from '../../interfaces/user-session.service.interface';

@Injectable()
export class UserSessionService implements UserSessionServiceInterface{
    constructor(
        @Inject('UserSessionRepositoryInterface')
        private userSessionRepository:UserSessionRepositoryInterface,
        private jwtService: JwtService,
    ){}
    async createSession(
        user: User, 
        sessionData: { fcm_token: any; device_id: any }
        ): Promise<UserSession> {
        const currentSession = await this.userSessionRepository.findOneByCondition({
            user_id: user.id,
            device_id: sessionData.device_id,
        });
        if (!currentSession) {
            return await this.userSessionRepository.createOne({
                user_id: +user.id,
                auth_token: await this.generateAuthToken(user),
                refresh_token: await this.generateRefreshToken(user),
                fcm_token: sessionData.fcm_token ?? null,
                device_id: sessionData.device_id,
            });
            } else {
            await this.userSessionRepository.updateOne({
                id: +currentSession.id,
                auth_token: await this.generateAuthToken(user),
                fcm_token: sessionData.fcm_token ?? null,
            });
            return await this.userSessionRepository.findOneById(
                parseInt(currentSession.id),
            );
        }
    }
    async removeSession(authToken: string): Promise<DeleteResult> {
        const session = await this.userSessionRepository.findOneByCondition({
            auth_token: authToken.replace(/^Bearer\s/, ''),
        });
        if (!session) {
            throw new HttpException(
            'invalid session',
            HttpStatus.BAD_REQUEST,
            );
        }
        return await this.userSessionRepository.remove(session.id);
    }
    generateAuthToken(user: User){
        const payload = {
            username: user.name,
            id: user.id,
            email: user.email,
            is_buyer: user.is_buyer,
            is_seller: user.is_seller,
            };

        const options = {
            expiresIn: '30d',
        };
        console.log('generateAuthToken',this.jwtService.sign(payload, options))
        return this.jwtService.sign(payload, options);
    }
    generateRefreshToken(user: User) {
        const payload = {
            username: user.name,
            id: user.id,
            email: user.email,
            is_buyer: user.is_buyer,
            is_seller: user.is_seller,
        };

        const options = {};
        return this.jwtService.sign(payload, options);
    }
    async generateAuthTokenFromRefreshToken(authorization: string): Promise<UserSession> {
        try {
            const currentSession = await this.userSessionRepository.findOneByCondition(
                { auth_token: authorization.replace('Bearer ', '') },
            );
            const payload = await this.jwtService.verify(
                currentSession.refresh_token,
            );
            const authToken = await this.generateAuthToken(payload);
            this.userSessionRepository.updateOne({
                id: +currentSession.id,
                auth_token: authToken,
            });
            return <UserSession>{
                id: currentSession.id,
                auth_token: authToken,
                refresh_token: currentSession.refresh_token,
            };
        } catch (e) {
            throw new HttpException(
                'AUTH_UPDATION_FAILED',
                HttpStatus.BAD_REQUEST,
            );
        }
        }
    
}
