import { Credential } from '@generated/prisma';

export type ICredentialRepositoryCreateParams = Pick<
  Credential,
  'email' | 'password' | 'userId'
>;
