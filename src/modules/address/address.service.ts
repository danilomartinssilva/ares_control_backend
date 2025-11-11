import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AddressCreatePayloadRequest } from 'src/dto/address/address-create.payload.request';
import { AddressSetDefaultPayloadRequest } from 'src/dto/address/address-set-default.payload.request';
import { AddressUpdatePayloadRequest } from 'src/dto/address/address-update.payload.request';

@Injectable()
export class AddressService {
  constructor(private prismaService: PrismaService) {}

  async createAddress(dto: AddressCreatePayloadRequest) {
    const address = await this.prismaService.address.create({
      data: {
        street: dto.street,
        city: dto.city,
        state: dto.state,
        zipCode: dto.zipCode,
        country: dto.country,
        userId: dto.userId,
        alias: dto.alias,
        defaultAddress: dto.defaultAddress,
      },
    });
    return address;
  }

  async getAddressByUserId(userId: string) {
    const addresses = await this.prismaService.address.findMany({
      where: { userId },
    });
    return addresses;
  }

  async deleteAddress(addressId: string) {
    const address = await this.prismaService.address.delete({
      where: { id: addressId },
    });
    return address;
  }

  async updateAddress(dto: AddressUpdatePayloadRequest) {
    const address = await this.prismaService.address.update({
      where: { id: dto.id },
      data: dto,
    });
    return address;
  }

  async setDefaultAddress(dto: AddressSetDefaultPayloadRequest) {
    const findAddress = await this.prismaService.address.findUnique({
      where: { id: dto.addressId, userId: dto.userId },
    });
    if (!findAddress) {
      throw new Error('Address not found');
    }
    if (findAddress.defaultAddress) {
      return findAddress;
    }

    const [, updatedAddress] = await this.prismaService.$transaction([
      this.prismaService.address.updateMany({
        where: {
          userId: findAddress.userId,
          defaultAddress: true,
        },
        data: {
          defaultAddress: false,
        },
      }),
      this.prismaService.address.update({
        where: { id: dto.addressId, userId: dto.userId },
        data: { defaultAddress: true },
      }),
    ]);

    return updatedAddress;
  }
}
