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
    email: string,
    filePath: string,
    companyName: string,
    link: string,
  ) {
    const template = await this.htmlTemplate.templateFromFile(filePath, {
      companyName,
      redirectUrl: link,
    });
    await this.mailerService.send(
      'jojoldu@gmail.com',
      email,
      '축하합니다',
      template,
    );
  }
}
