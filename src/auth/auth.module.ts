import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserSessionModule } from '../user-session/user-session.module';
import { UserRepository } from '../user/repositories/user/user.repository';
import { JwtStrategy } from './strategies/jwt/jwt.strategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    UserSessionModule,
    UserModule,
    PassportModule
  ],
  providers: [
    {
      provide:'AuthServiceInterface',
      useClass:AuthService
    },
    {
      provide:'UserRepositoryInterface',
      useClass:UserRepository
    }
    ,LocalStrategy,
    JwtStrategy
  ],
  controllers: [AuthController],
  exports:[
    {
      provide:'AuthServiceInterface',
      useClass:AuthService
    }
  ]
})
export class AuthModule {}
