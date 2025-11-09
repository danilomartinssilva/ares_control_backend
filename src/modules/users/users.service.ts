import { Injectable } from '@nestjs/common';
import { UserCreatePayloadRequest } from '../../dto/users';
import { PrismaService } from '../../database/prisma.service';
import { UserUpdatePayloadRequest } from 'src/dto/users/user-update-payload.request';

const userSelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
};

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  createUser(createUserDto: UserCreatePayloadRequest) {
    return this.prismaService.user.create({
      data: createUserDto,
      select: userSelect,
    });
  }

  getUsers() {
    return this.prismaService.user.findMany({
      select: userSelect,
    });
  }

  updateUser(updateUserDto: UserUpdatePayloadRequest) {
    return this.prismaService.user.update({
      where: { id: updateUserDto.id },
      data: updateUserDto,
      select: userSelect,
    });
  }

  deleteUser(userId: string) {
    return this.prismaService.user.delete({
      where: { id: userId },
      select: userSelect,
    });
  }
}
