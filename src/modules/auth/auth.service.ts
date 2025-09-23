import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@src/libs/prisma/prisma.service';
import { UserRepository } from '@src/modules/user/user.repository';
import { PasswordHelper } from '@src/common/utils/password-helper';
import { AuthRegisterDto, AuthLoginDto } from '@src/modules/auth/dtos';
import { CredentialRepository } from '@src/modules/credential/credential.repository';
import { AuthLoginVo, AuthRegisterVo } from '@src/modules/auth/vo';
import { config } from '@src/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly crendentialRepo: CredentialRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async register(registerDto: AuthRegisterDto): Promise<AuthRegisterVo> {
    const { email, password, name } = registerDto;

    return this.prismaService.$transaction(async (prisma) => {
      const userExisted = await this.userRepo.findUnique(prisma, { email });

      if (userExisted) throw new ConflictException('Email is already existed!');

      const user = await this.userRepo.create(prisma, { email, name });
      await this.crendentialRepo.create(prisma, {
        email,
        password,
        userId: user.id,
      });

      const authRegisterVo = new AuthRegisterVo('Success');
      return authRegisterVo;
    });
  }

  async login(loginDto: AuthLoginDto): Promise<AuthLoginVo> {
    const { email, password } = loginDto;
    return this.prismaService.$transaction(async (prisma) => {
      // check user
      const credential = await this.crendentialRepo.findUnique(prisma, {
        email,
      });
      if (!credential)
        throw new UnauthorizedException('Email or password incorrect!');

      // validate password
      const { password: credenitalPassword, ...payload } = credential;
      const passwordValid = await PasswordHelper.compare(
        password,
        credenitalPassword,
      );
      if (!passwordValid)
        throw new UnauthorizedException('Email or password incorrect!');

      const accessToken = this.generateAccessToken(payload);
      const refreshToken = this.generateRefreshToken(payload);
      const authLoginVo = new AuthLoginVo(accessToken, refreshToken);

      return authLoginVo;
    });
  }

  generateAccessToken(payload: Buffer | object): string {
    return this.jwtService.sign(payload, {
      secret: config.JWT.ACCESS.SECRETKEY,
      expiresIn: config.JWT.ACCESS.EXPIRESIN,
    });
  }

  generateRefreshToken(payload: Buffer | object): string {
    return this.jwtService.sign(payload, {
      secret: config.JWT.REFESH.SECRETKEY,
      expiresIn: config.JWT.REFESH.EXPIRESIN,
    });
  }
}
