import { Injectable } from '@nestjs/common';
import { UserCreatePayloadRequest } from '../../dto/users';
import { PrismaService } from '../../database/prisma.service';
import { UserUpdatePayloadRequest } from 'src/dto/users/user-update-payload.request';
import * as bcrypt from 'bcrypt';
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
    const payload = {
      ...createUserDto,
      password: bcrypt.hashSync(createUserDto.password, 10),
    };
    return this.prismaService.user.create({
      data: payload,
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

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
      select: { ...userSelect, password: true },
    });
  }

  findByID(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      select: userSelect,
    });
  }
}
