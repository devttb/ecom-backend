import authConfig from '@src/config/auth.config';
import * as bcrypt from 'bcrypt';

export class PasswordHelper {
  private static SALT_ROUNDS = authConfig().SALT_ROUNDS;

  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  static async compare(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
  }
}
