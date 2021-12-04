# 메세지의 템플릿 내용 단위 테스트 하기

![cover](./images/cover.png)

서비스를 개발하다보면 특정 포맷으로 이메일을 보내거나, 
이를 테면 다음과 같은 경우이다.

* 메일/카카오톡/문자 등으로 보내는 템플릿 내용
* SQS와 같은 메세지큐에 보내는 메세지 내용
* 비지니스 담당자가 봐야하는 로그


> 이전에 작성된 [Mustache.js 로 이메일 템플릿 구성하기](https://jojoldu.tistory.com/618)를 참고하시면 좋습니다.

![2](./images/2.png)

![1](./images/1.png)


```js
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
        userName: string,
    ) {
        const template = await this.htmlTemplate.templateFromFile(filePath, {
            companyName,
            jobSeeker: userName,
        });
        await this.mailerService.send(
            'jojoldu@gmail.com',
            email,
            '축하합니다',
            template,
        );
    }
}
```


```js
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
```
