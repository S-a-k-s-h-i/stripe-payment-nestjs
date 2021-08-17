import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserSessionDto {
    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsNotEmpty()
    @IsString()
    auth_token: string;

    @IsNotEmpty()
    @IsString()
    refresh_token: string;

    @IsOptional()
    @IsString()
    fcm_token: string;

    @IsNotEmpty()
    @IsString()
    device_id: string;
}
