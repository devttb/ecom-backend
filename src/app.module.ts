import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import appConfig from '@src/config/app.config';
import authConfig from '@src/config/auth.config';
import mailConfig from '@src/config/mail.config';
import { AuthModule } from '@src/modules/auth/auth.module';
import { UserModule } from '@src/modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, authConfig, mailConfig],
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    JwtModule,
  ],
})
export class AppModule {}
