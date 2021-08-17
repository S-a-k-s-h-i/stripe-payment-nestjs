import { Controller,Request, Inject, Post, UseGuards, Delete,Headers } from '@nestjs/common';
import { Public } from '../../../general/decorators/public.decorator';
import { User } from '../../../user/entities/user.entity';
import { LocalAuthGuard } from '../../guards/local-auth/local-auth.guard';
import { AuthServiceInterface } from '../../interfaces/auth.service.interface';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AuthServiceInterface')
        private authService:AuthServiceInterface
    ){}
    
    /**
     * API for user login
     * @param req contains request to authenticate user
     * @returns [Message,user]
     */
    @Public()
    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req):Promise<(string | User)[]>{
        const user = await this.authService.login(req.body,req.user);
        return ['login Successfully',user]
    }

    @Delete('logout')
    async logout(@Headers('Authorization') authToken:string):Promise<string[]>{
        await this.authService.logout(authToken);
        return ['logout successfully']
    }
    
}
