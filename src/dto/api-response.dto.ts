import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty({
    example: true,
    description: 'Indica se a requisição foi bem-sucedida',
  })
  success: true;

  @ApiProperty({ required: false, description: 'Dados da resposta' })
  data?: T;
}

export class ApiErrorResponseDto {
  @ApiProperty({ example: false, description: 'Indica se a requisição falhou' })
  success: false;

  @ApiProperty({
    type: [String],
    description: 'Mensagens de erro retornadas pela API',
  })
  message: string[];

  @ApiProperty({
    description: 'Erros detalhados retornados pela API',
  })
  errors: Record<string, unknown>;
}
