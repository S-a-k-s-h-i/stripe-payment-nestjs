import { Module } from '@nestjs/common';
import { UserSessionController } from './controllers/user-session/user-session.controller';
import { UserSessionService } from './services/user-session/user-session.service';

@Module({
  controllers: [UserSessionController],
  providers: [UserSessionService]
})
export class UserSessionModule {}
