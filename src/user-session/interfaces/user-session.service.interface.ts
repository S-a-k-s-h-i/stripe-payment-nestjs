import { DeleteResult } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { UserSession } from "../entities/user-session.entity";


export interface UserSessionServiceInterface{
    createSession(user: User, sessIonData: any): Promise<UserSession>;
    removeSession(authToken: string): Promise<DeleteResult>;
    generateAuthToken(user: User);
    generateRefreshToken(user: User);
    generateAuthTokenFromRefreshToken(refreshToken: string): Promise<UserSession>;
}