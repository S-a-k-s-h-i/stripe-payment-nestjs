import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSessionController } from './controllers/user-session/user-session.controller';
import { UserSession } from './entities/user-session.entity';
import { UserSessionService } from './services/user-session/user-session.service';
import { JwtModule } from '@nestjs/jwt';
import { UserSessionRepository } from './repositories/user-session.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserSession]),
    JwtModule.registerAsync({
      useFactory:() => ({
        secret:process.env.JWT_AUTH_SECRET
      })
    })
  ],
  controllers: [UserSessionController],
  providers: [
    {
      provide:'UserSessionServiceInterface',
      useClass:UserSessionService
    },
    {
      provide:'UserSessionRepositoryInterface',
      useClass:UserSessionRepository
    }
  ],
  exports:[
    {
      provide:'UserSessionServiceInterface',
      useClass:UserSessionService
    }
  ]
})
export class UserSessionModule {}
