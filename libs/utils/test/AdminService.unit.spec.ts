import { MailerService } from '@app/utils/MailerService';
import { AdminService } from '@app/utils/AdminService';
import { HtmlTemplate } from '@app/utils/HtmlTemplate';

class StubMailerService extends MailerService {
  content: string;
  async send(
    from: string,
    to: string,
    subject: string,
    content: string,
  ): Promise<void> {
    this.content = content;
  }
}

describe('AdminService', () => {
  it('email template 검증', async () => {
    const spy = new StubMailerService();
    const service = new AdminService(spy, new HtmlTemplate());

    const companyName = '인프랩';
    const userName = '테스트유저';
    await service.sendMail('test@gmail.com', 'sample', companyName, userName);

    expect(spy.content).toContain(companyName);
    expect(spy.content).toContain(userName);
  });
});
