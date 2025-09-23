import { User } from '@generated/prisma';

export type IUserRepositoryCreateParams = Pick<User, 'email' | 'name'>;
