import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsUUID } from 'class-validator';
import { AddressCreateDataResponse } from '../address/address-create.data.response';

export class UserCreateDataResponse {
  @ApiProperty({
    description: 'ID of the created user',
    example: 'd45er7e-1234-5678-9012-3456789abcdef',
  })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Name of the created user', example: 'John Doe' })
  name: string;

  @ApiProperty({
    description: 'Email of the created user',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Phone number of the created user',
    example: '64123456789',
  })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    description: 'Addresses associated with the user',
    type: [AddressCreateDataResponse],
    isArray: true,
  })
  addresses: AddressCreateDataResponse[];
}
