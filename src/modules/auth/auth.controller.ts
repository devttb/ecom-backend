import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '@src/modules/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  register(
    @Body() registerDto: { email: string; password: string; name: string },
  ) {
    const { email, password, name } = registerDto;
    const user = this.authService.register({ email, password, name });

    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: Record<string, any>) {
    const { email, password } = loginDto;
    const user = this.authService.login(email, password);

    return user;
  }
}
