import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@generated/prisma';
import { IUserRepositoryCreateParams } from '@src/modules/user/user.repository.type';

@Injectable()
export class UserRepository {
  async create(
    prisma: Prisma.TransactionClient,
    params: IUserRepositoryCreateParams,
  ): Promise<User> {
    const { email, name } = params;

    return prisma.user.create({
      data: {
        email,
        name,
      },
    });
  }

  async findUnique(
    prisma: Prisma.TransactionClient,
    params: Partial<User>,
  ): Promise<User | null> {
    const { email, id } = params;

    return prisma.user.findUnique({ where: { email, id } });
  }
}
