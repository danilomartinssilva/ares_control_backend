import { Injectable } from '@nestjs/common';
import { UserCreatePayloadRequest } from '../dto/users';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  createUser(createUserDto: UserCreatePayloadRequest) {
    // Logic to create a user in the database
    return this.prismaService.user.create({
      data: createUserDto,
    });
  }
}
