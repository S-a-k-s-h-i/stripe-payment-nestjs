import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth/jwt-auth.guard';
import { UserSessionModule } from './user-session/user-session.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    TypeOrmModule.forRoot(),
    UserModule, 
    AuthModule, UserSessionModule],
  controllers: [AppController],
  providers: [
        // Default middleware guard for all the request
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
    AppService],
})
export class AppModule {}
