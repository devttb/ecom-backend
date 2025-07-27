import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { PrismaService } from '@src/libs/prisma/prisma.service';
import { AuthGuard } from '@src/modules/auth/auth.guard';
import { TAuthGuardRequest } from '@src/modules/auth/auth.util';
import { UserRepository } from '@src/modules/user/user.repository';

@Controller('user')
export class UserController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userRepo: UserRepository,
  ) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Req() req: TAuthGuardRequest) {
    const crendential = req.credential;
    return this.userRepo.findUnique(this.prismaService, {
      id: crendential.userId,
    });
  }
}
