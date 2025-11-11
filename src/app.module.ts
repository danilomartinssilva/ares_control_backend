import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

import { AddressModule } from './modules/address/address.module';
import { AddressService } from './modules/address/address.service';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    AddressModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, AddressService],
})
export class AppModule {}
