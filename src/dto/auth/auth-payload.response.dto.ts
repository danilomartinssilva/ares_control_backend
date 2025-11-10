import { ApiProperty } from '@nestjs/swagger';

export class AuthPayloadResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;
  @ApiProperty({
    description: 'JWT token',
    example: 'eyJhbGciOi',
  })
  token: string;
}
