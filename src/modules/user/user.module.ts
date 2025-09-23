import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@src/libs/prisma/prisma.module';
import { UserController } from '@src/modules/user/user.controller';
import { UserRepository } from '@src/modules/user/user.repository';

@Module({
  imports: [PrismaModule, JwtModule],
  providers: [UserRepository],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}
