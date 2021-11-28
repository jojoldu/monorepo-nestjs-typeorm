# Mustache로 이메일 템플릿 구성하기

이메일 기능 구현을 위해서 많은 고민을 하는 부분이 이메일 본문을 위한 템플릿 구성입니다.

> AWS SES 등 이메일 발송 자체는 이제 예전처럼 SMTP 서버 구축 등을 할 필요가 없어서 훨씬 난이도가 줄었습니다.

일반적으로 이메일의 본문은 HTML + Inner CSS로 작성을 합니다.  
이메일 안에서는 CSS나 JS 파일 로드가 안되기 때문에 HTML 코드만으로 해결이 되어야 하는데요.
그러다보니 이메일 본문을 작성하기 위해서는 다음의 조건들이 만족 되어야 편하게 개발이 가능합니다.

* HTML 코드로 작성하되 서버 애플리케이션 코드에서 문자열 (`string`) 으로 변환이 가능해야한다
* HTML 코드 내부에 수신자의 이름, 주문내역 등과 같이 변수들을 할당해서 치환이 가능해야 한다
* HTML과 Inner CSS의 코드 하이라이팅 / 자동완성 등이 지원 되어야한다

위 내용을 보면 예전 [EJS](https://ejs.co/) 와 같은 서버 템플릿 엔진이 떠오를텐데요.  
결국 **서버에서 데이터와 마크업 코드를 합쳐서 HTML 로 내려준다**와 비슷하기 때문입니다.  

![template](./images/template.png)

최종적으로 내려주는 결과물이 HTML 이냐 문자열이냐의 차이일뿐이죠.  


![1](./images/1.png)

```bash
yarn add mustache @types/mustache
```

```js
describe('HtmlTemplate', () => {
  let sut: HtmlTemplate;

  beforeEach(() => {
    sut = new HtmlTemplate();
  });

  it('template 호출시 html과 데이터가 합쳐서 문자열 반환된다', () => {
    const data = {
      companyName: '인프랩',
      companyUser: '이동욱',
    };
    const html = '<p>{{companyName}} 소속의 {{companyUser}}님 안녕하세요</p>';

    const result = sut.template(html, data);

    expect(result).toBe('<p>인프랩 소속의 이동욱님 안녕하세요</p>');
  });

  it('hbs 파일과 데이터가 합쳐서 문자열 반환된다', async () => {
    const data = {
      companyName: '인프랩',
      jobSeeker: '이동욱',
      positionName: '백엔드 개발자',
    };
    const fileName = 'sample';

    const result = await sut.templateFromFile(fileName, data);

    expect(result).toContain('안녕하세요 이동욱님');
    expect(result).toContain(
      '축하합니다! 인프랩의 백엔드 개발자에 최종 합격되었습니다',
    );
    expect(result).toContain('인프랩 담당자가 곧 연락을 드릴 예정입니다');
  });
});
```

## Tips

### IDE Plugin

IntelliJ / WebStorm 등

![plugin](./images/plugin.png)

[플러그인](https://plugins.jetbrains.com/plugin/6884-handlebars-mustache)


### Preview

![preview](./images/plugin.png)
