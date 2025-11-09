import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UserCreatePayloadRequest {
  @ApiProperty({ description: 'User name', example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'User email', example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'User password', example: 'securePassword123' })
  @IsString()
  @IsNotEmpty()
  @Length(8, 12, {
    message: 'Password must be between 8 and 12 characters long',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one special character, and be between 8 and 12 characters long',
  })
  password: string;

  @ApiProperty({ description: 'User phone number', example: '+1234567890' })
  @IsString()
  @IsNotEmpty()
  @Length(10, 15, {
    message: 'Phone number must be between 10 and 15 characters long',
  })
  phone: string;
}
