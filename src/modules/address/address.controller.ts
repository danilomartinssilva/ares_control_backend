import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { AddressCreatePayloadRequest } from 'src/dto/address/address-create.payload.request';
import {
  ErrorResponseDecorator,
  SuccessResponseDecorator,
} from 'src/decorators/api-response.decorator';
import { AddressUpdatePayloadRequest } from 'src/dto/address/address-update.payload.request';
import { AddressCreateDataResponse } from 'src/dto/address/address-create.data.response';
import { AuthGuard } from '@nestjs/passport';

@Controller('address')
@ApiTags('Gerenciamento de Endereços')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @SuccessResponseDecorator({
    type: AddressCreateDataResponse,
    summary: 'Criação de um novo endereço',
  })
  @ErrorResponseDecorator(
    HttpStatus.BAD_REQUEST,
    'Bad Request: Dados inválidos para criação de endereço',
  )
  async createAddress(@Body() dto: AddressCreatePayloadRequest) {
    return this.addressService.createAddress(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id')
  @SuccessResponseDecorator({
    type: Object,
    summary: 'Atualização de um endereço existente',
  })
  @ErrorResponseDecorator(
    HttpStatus.BAD_REQUEST,
    'Bad Request: Dados inválidos para atualização de endereço',
  )
  async updateAddress(
    @Param('id') id: string,
    @Body() dto: AddressUpdatePayloadRequest,
  ) {
    dto.id = id;
    return this.addressService.updateAddress(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:userId')
  @SuccessResponseDecorator({
    type: AddressCreateDataResponse,
    isArray: true,
    summary: 'Recupera a lista de endereços de um usuário',
  })
  @ErrorResponseDecorator(
    HttpStatus.BAD_REQUEST,
    'Bad Request: Erro ao recuperar a lista de endereços',
  )
  async getAddressByUserId(@Param('userId') userId: string) {
    return this.addressService.getAddressByUserId(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @SuccessResponseDecorator({
    summary: 'Remove um endereço existente',
  })
  @ErrorResponseDecorator(
    HttpStatus.BAD_REQUEST,
    'Bad Request: Erro ao remover o endereço',
  )
  async deleteAddress(@Param('id') id: string) {
    return this.addressService.deleteAddress(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('set-default/:addressId/user/:userId')
  @SuccessResponseDecorator({
    type: AddressCreateDataResponse,
    summary: 'Define um endereço como padrão',
  })
  @ErrorResponseDecorator(
    HttpStatus.BAD_REQUEST,
    'Bad Request: Erro ao definir o endereço como padrão',
  )
  async setDefaultAddress(
    @Param('addressId') addressId: string,
    @Param('userId') userId: string,
  ) {
    return this.addressService.setDefaultAddress({ addressId, userId });
  }
}
