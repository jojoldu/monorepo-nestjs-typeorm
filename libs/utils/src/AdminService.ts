import { Injectable } from '@nestjs/common';
import { MailerService } from '@app/utils/MailerService';
import { HtmlTemplate } from '@app/utils/HtmlTemplate';

@Injectable()
export class AdminService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly htmlTemplate: HtmlTemplate,
  ) {}

  async sendMail(
    to: string,
    filePath: string,
    companyName: string,
    userName: string,
  ) {
    const template = await this.htmlTemplate.templateFromFile(filePath, {
      companyName,
      userName: userName,
    });
    await this.mailerService.send(
      'jojoldu@gmail.com',
      to,
      '축하합니다',
      template,
    );
  }
}
