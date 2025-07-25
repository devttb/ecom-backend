import { Module } from '@nestjs/common';
import { AuthModule } from '@src/modules/auth/auth.module';
import { UserModule } from '@src/modules/user/user.module';
import { PrismaService } from '@src/libs/prisma/prisma';

@Module({
  providers: [PrismaService],
  imports: [AuthModule, UserModule],
})
export class AppModule {}
