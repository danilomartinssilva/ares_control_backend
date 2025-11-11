import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
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
import { AuthGuard } from '@nestjs/passport';
import { UserUpdatePayloadRequest } from 'src/dto/users/user-update-payload.request';

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
  @UseGuards(AuthGuard('jwt'))
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

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @SuccessResponseDecorator({
    type: UserCreateDataResponse,
    summary: 'Remove um usuário existente',
  })
  @ErrorResponseDecorator(
    HttpStatus.BAD_REQUEST,
    'Bad Request: Erro ao remover o usuário',
  )
  deleteUser(@Param('id') id: string): Promise<UserCreateDataResponse> {
    return this.usersService.deleteUser(id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @SuccessResponseDecorator({
    type: UserCreateDataResponse,
    summary: 'Recupera um usuário pelo ID',
  })
  @ErrorResponseDecorator(
    HttpStatus.BAD_REQUEST,
    'Bad Request: Erro ao recuperar o usuário',
  )
  findById(@Param('id') id: string): Promise<UserCreateDataResponse> {
    return this.usersService.findByID(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @SuccessResponseDecorator({
    type: UserCreateDataResponse,
    summary: 'Atualiza um usuário pelo ID',
  })
  @ErrorResponseDecorator(
    HttpStatus.BAD_REQUEST,
    'Bad Request: Erro ao atualizar o usuário',
  )
  updateUser(
    @Param('id') id: string,
    @Body() dto: Partial<UserUpdatePayloadRequest>,
  ): Promise<UserCreateDataResponse> {
    dto.id = id;
    return this.usersService.updateUser({
      ...dto,
      id,
    } as UserUpdatePayloadRequest);
  }
}
