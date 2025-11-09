import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  ErrorResponseDecorator,
  SuccessResponseDecorator,
} from 'src/decorators/api-response.decorator';
import { AuthPayloadResponseDto } from 'src/dto/auth/auth-payload.response.dto';
import { AuthPayloadRequestDto } from 'src/dto/auth/auth-payload.request.dto';

@Controller('auth')
@ApiTags('Autenticação')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @SuccessResponseDecorator({
    summary: 'Endpoint para autenticação de usuários',
    type: AuthPayloadResponseDto,
  })
  @ErrorResponseDecorator(401, 'Unauthorized: Credenciais inválidas')
  signIn(@Body() dto: AuthPayloadRequestDto) {
    return this.authService.signIn(dto);
  }
}
