import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddressUpdatePayloadRequest {
  @ApiProperty({
    description: 'ID of the address to be updated',
    example: 'd45er7e-1234-5678-9012-3456789abcdef',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Street name', example: '123 Main St' })
  @IsNotEmpty()
  street: string;

  @ApiProperty({ description: 'City name', example: 'Springfield' })
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'State name', example: 'IL' })
  @IsNotEmpty()
  state: string;

  @ApiProperty({ description: 'Postal code', example: '62704' })
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({ description: 'Country name', example: 'USA' })
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    description: 'User ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Address alias',
    example: 'Home',
    required: false,
  })
  alias?: string;

  @ApiProperty({
    description: 'Set as default address',
    example: true,
    required: false,
  })
  defaultAddress?: boolean;
}
