import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthPayloadRequestDto } from 'src/dto/auth/auth-payload.request.dto';
import { AuthPayloadResponseDto } from 'src/dto/auth/auth-payload.response.dto';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    dto: AuthPayloadRequestDto,
  ): Promise<AuthPayloadResponseDto | null> {
    const foundUser = await this.usersService.findByEmail(dto.email);

    if (!foundUser) {
      throw new UnauthorizedException('E-mail not found');
    }
    const isPasswordValid = bcryptCompareSync(dto.password, foundUser.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: foundUser.id, email: foundUser.email };
    const token = this.jwtService.sign(payload);

    return {
      token,
      id: foundUser.id,
    };
  }
}
