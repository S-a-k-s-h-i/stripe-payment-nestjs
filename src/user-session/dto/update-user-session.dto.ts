import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserSessionDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsOptional()
    @IsString()
    auth_token: string;

    @IsOptional()
    @IsString()
    fcm_token?: string;
}
