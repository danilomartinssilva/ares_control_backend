import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import {
  UserCreateDataResponse,
  UserCreatePayloadRequest,
} from 'src/dto/users';
import {
  ErrorResponseDecorator,
  SuccessResponseDecorator,
} from 'src/decorators/api-response.decorator';

@ApiTags('Gerenciamento de Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @SuccessResponseDecorator({
    type: UserCreateDataResponse,
    summary: 'Criação de um novo usuário',
  })
  @ErrorResponseDecorator(
    HttpStatus.BAD_REQUEST,
    'Bad Request: Dados inválidos para criação de usuário',
  )
  createUser(
    @Body() dto: UserCreatePayloadRequest,
  ): Promise<UserCreateDataResponse> {
    return this.usersService.createUser(dto);
  }

  @Get()
  @SuccessResponseDecorator({
    type: UserCreateDataResponse,
    isArray: true,
    summary: 'Recupera a lista de todos os usuários',
  })
  @ErrorResponseDecorator(
    HttpStatus.BAD_REQUEST,
    'Bad Request: Erro ao recuperar a lista de usuários',
  )
  getUsers(): Promise<UserCreateDataResponse[]> {
    return this.usersService.getUsers();
  }
}
