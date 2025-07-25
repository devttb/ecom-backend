import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@src/libs/prisma/prisma';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<any> {
    const { email, password, name } = data;
    const credential = await this.prisma.credential.create({
      data: { email, password },
    });

    const user = await this.prisma.user.create({ data: { email, name } });

    if (!credential || !user) {
      throw new NotFoundException(`User not found!`);
    }
    return { credential, user };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.prisma.credential.findFirst({
      where: { email, password },
    });

    if (!user) {
      throw new NotFoundException(`User not found!`);
    }

    if (password !== user.password) {
      throw new NotFoundException(`email or password is wrong`);
    }

    return { accessToken: '' };
  }
}
