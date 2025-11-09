import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import {
  UserCreateDataResponse,
  UserCreatePayloadRequest,
} from 'src/dto/users';

@ApiTags('Gerenciamento de Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(
    @Body() dto: UserCreatePayloadRequest,
  ): Promise<UserCreateDataResponse> {
    return this.usersService.createUser(dto);
  }
}
