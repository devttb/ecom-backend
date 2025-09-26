import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailService: MailerService,
    private readonly configs: ConfigService,
  ) {}

  async sendMailVerify(to: string, token: string): Promise<void> {
    await this.mailService.sendMail({
      to,
      template: 'user-verify',
      context: {
        rootUrl: this.configs.get<string>('ROOT_URL'),
        token,
      },
    });
  }
}
