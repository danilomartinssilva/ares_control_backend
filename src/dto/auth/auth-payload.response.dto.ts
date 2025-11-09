import { ApiProperty } from '@nestjs/swagger';

export class AuthPayloadResponseDto {
  @ApiProperty({
    description: 'User email',
  })
  email: string;
  @ApiProperty({
    description: 'JWT token',
    example: 'eyJhbGciOi',
  })
  token: string;
}
