import { Module } from '@nestjs/common';
import { PrismaService } from '../../../src/database/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 🔑 Essencial: Garante que outros módulos possam injetar o PrismaService.
})
export class PrismaModule {}
