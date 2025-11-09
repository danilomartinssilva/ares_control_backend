import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class UserUpdatePayloadRequest {
  @ApiProperty({
    description: 'User ID',
    example: 'd45er7e-1234-5678-9012-3456789abcdef',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'User name', example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'User email', example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'User phone number', example: '+1234567890' })
  @IsString()
  @IsNotEmpty()
  @Length(10, 15, {
    message: 'Phone number must be between 10 and 15 characters long',
  })
  phone: string;
}
