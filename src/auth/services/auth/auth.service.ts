import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthServiceInterface } from '../../interfaces/auth.service.interface';
import { UserRepositoryInterface } from '../../../user/interfaces/user.repository.interface';
import { UserSessionServiceInterface } from '../../../user-session/interfaces/user-session.service.interface';

@Injectable()
export class AuthService implements AuthServiceInterface {
    constructor(
        @Inject('UserRepositoryInterface')
        private readonly userRepository:UserRepositoryInterface,
        @Inject('UserSessionServiceInterface')
        private readonly userSessionService:UserSessionServiceInterface
    ){}
    
    /**
     * Method to validate user with username and password
     * @param username name
     * @param pass password
     * @returns any
     */
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userRepository.findOneByCondition(
            {name:username},
            [
                'id',
                'email',
                'name',
                'is_buyer',
                'is_seller',
                'password',
            ]
        );
        if (user && bcrypt.compareSync(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    /**
   * Method to login user
   * @param body Contains validated user data
   * @param user User request body
   * @returns Any
   */
    async login(body: any, user: any): Promise<any> {
    let userExists = false;
    if (body.is_buyer) {
        userExists = user.is_buyer === body.is_buyer;
    } else if (body.is_seller) {
        userExists = user.is_seller === body.is_seller;
    }

    if (!userExists)
        throw new HttpException(
            'INVALID_CREDENTIALS',
            HttpStatus.BAD_REQUEST,
        );

    const session = await this.userSessionService.createSession(user, {
        fcm_token: body.fcm_token ?? null,
        device_id: body.device_id ?? null,
    });

    return {
        id: user.id,
        email: user.email,
        username: user.name,
        is_buyer: user.is_buyer,
        is_seller: user.is_seller,
        session: {
        id: session.id,
        auth_token: session.auth_token,
        fcm_token: session.fcm_token,
        refresh_token: session.refresh_token,
        device_id: session.device_id,
        },
        };
    }

    /**
   * Method to logout user
   * @param authToken Logged in user auth token
   * @returns void
   */
    async logout(authToken: string): Promise<void> {
        await this.userSessionService.removeSession(authToken);
    }

}
