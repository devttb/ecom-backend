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
import { MailService } from '@src/modules/mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly crendentialRepo: CredentialRepository,
    private readonly userRepo: UserRepository,
    private readonly mailService: MailService,
    private readonly configs: ConfigService,
  ) {}

  async register(registerDto: AuthRegisterDto): Promise<AuthRegisterVo> {
    const { email, password, name } = registerDto;

    return this.prismaService.$transaction(async (prisma) => {
      const userExisted = await this.userRepo.findUnique(prisma, { email });

      // check user
      if (userExisted) throw new ConflictException('Email is already existed!');

      const user = await this.userRepo.create(prisma, { email, name });
      await this.crendentialRepo.create(prisma, {
        email,
        password,
        userId: user.id,
      });

      // send mail verify
      const token = this.generateVerifyToken({ email });
      await this.mailService.sendMailVerify(email, token);

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

      // generate tokens
      const accessToken = this.generateAccessToken(payload);
      const refreshToken = this.generateRefreshToken(payload);
      const authLoginVo = new AuthLoginVo(accessToken, refreshToken);

      return authLoginVo;
    });
  }

  generateAccessToken(payload: Buffer | object): string {
    return this.jwtService.sign(payload, {
      secret: this.configs.get<string>('JWT_ACCESS_KEY'),
      expiresIn: this.configs.get<string>('JWT_ACCESS_EXPIRESIN'),
    });
  }

  generateRefreshToken(payload: Buffer | object): string {
    return this.jwtService.sign(payload, {
      secret: this.configs.get<string>('JWT_REFESH_KEY'),
      expiresIn: this.configs.get<string>('JWT_REFESH_EXPIRESIN'),
    });
  }

  generateVerifyToken(payload: Buffer | object): string {
    return this.jwtService.sign(payload, {
      secret: this.configs.get<string>('JWT_VERIFY_KEY'),
      expiresIn: this.configs.get<string>('JWT_VERIFY_EXPIRESIN'),
    });
  }
}
