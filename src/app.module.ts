import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '@src/modules/auth/auth.module';
import { UserModule } from '@src/modules/user/user.module';

@Module({
  imports: [AuthModule, UserModule, JwtModule],
})
export class AppModule {}
