import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AddressCreateDataResponse {
  @ApiProperty({
    description: 'ID of the created address',
    example: 'd45er7e-1234-5678-9012-3456789abcdef',
  })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Street name', example: '123 Main St' })
  street: string;

  @ApiProperty({ description: 'City name', example: 'Springfield' })
  city: string;

  @ApiProperty({ description: 'State name', example: 'IL' })
  state: string;

  @ApiProperty({ description: 'Postal code', example: '62704' })
  zipCode: string;

  @ApiProperty({ description: 'Country name', example: 'USA' })
  country: string;

  @ApiProperty({
    description: 'User ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  userId: string;

  @ApiProperty({
    description: 'Address alias',
    example: 'Home',
  })
  alias: string;

  @ApiProperty({
    description: 'Set as default address',
    example: true,
  })
  defaultAddress: boolean;
}
