import { Module } from '@nestjs/common';
import { PrismaService } from '@src/libs/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CredentialModule } from '@src/modules/credential/credential.module';
import { UserModule } from '@src/modules/user/user.module';
import { AuthService } from '@src/modules/auth/auth.service';
import { AuthController } from '@src/modules/auth/auth.controller';
import { MailModule } from '@src/modules/mail/mail.module';

@Module({
  imports: [CredentialModule, UserModule, MailModule],
  providers: [AuthService, PrismaService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
