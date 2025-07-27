import { Prisma, Credential } from '@generated/prisma';
import { PasswordHelper } from '@src/common/utils/password-helper';
import { Injectable } from '@nestjs/common';
import { ICredentialRepositoryCreateParams } from '@src/modules/credential/credential.repository.type';

@Injectable()
export class CredentialRepository {
  async create(
    prisma: Prisma.TransactionClient,
    params: ICredentialRepositoryCreateParams,
  ): Promise<Credential> {
    const { email, password, userId } = params;
    const passwordHashed = await PasswordHelper.hash(password);

    return prisma.credential.create({
      data: {
        email,
        password: passwordHashed,
        userId,
      },
    });
  }

  async findUnique(
    prisma: Prisma.TransactionClient,
    params: Pick<Credential, 'email'>,
  ): Promise<Credential | null> {
    const { email } = params;

    return prisma.credential.findUnique({ where: { email } });
  }
}
