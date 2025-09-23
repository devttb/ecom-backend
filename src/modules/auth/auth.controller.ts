import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@src/modules/auth/auth.service';
import { AuthRegisterDto, AuthLoginDto } from '@src/modules/auth/dtos';
import { AuthLoginVo } from '@src/modules/auth/vo/auth-login.vo';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse()
  register(@Body() { email, password, name }: AuthRegisterDto) {
    return this.authService.register({ email, password, name });
  }

  @Post('login')
  @ApiOkResponse()
  login(@Body() { email, password }: AuthLoginDto): Promise<AuthLoginVo> {
    return this.authService.login({ email, password });
  }
}
