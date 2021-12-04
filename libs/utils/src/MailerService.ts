import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  async send(
    from: string,
    to: string,
    subject: string,
    content: string,
  ): Promise<void> {
    console.log('메일 발송');
  }
}
