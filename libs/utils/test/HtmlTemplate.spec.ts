import { HtmlTemplate } from '@app/utils/HtmlTemplate';

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
