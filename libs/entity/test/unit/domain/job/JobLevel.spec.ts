import { JobLevel } from '@app/entity/domain/job/JobLevel';

describe('JobLevel', () => {
  it.each([
    [0, '인턴/신입'],
    [1, '주니어'],
    [5, '미들'],
    [11, '시니어'],
  ])('연차 %s인 경우 역량 등급은 %s이다', (year, grade) => {
    const result = JobLevel.findByYear(Number(year));

    expect(result.name).toBe(grade);
  });

  it('ts-jenum 기본 케이스 검증', () => {
    // toString은 @Enum() 에 선언된 필드를 사용한다
    expect('' + JobLevel.IRRELEVANT).toBe(JobLevel.IRRELEVANT.code);

    // values() 는 전체 EClass를 반환한다
    expect(JobLevel.values()).toStrictEqual([
      JobLevel.IRRELEVANT,
      JobLevel.BEGINNER,
      JobLevel.JUNIOR,
      JobLevel.MIDDLE,
      JobLevel.SENIOR,
    ]);

    // valueOf는 @Enum() 에 선언된 필드를 통해 찾을 수 있다
    expect(JobLevel.valueOf('MIDDLE')).toBe(JobLevel.MIDDLE);

    // valueByName 는 실제 static 클래스이름으로 찾을 수 있다
    expect(JobLevel.valueByName('MIDDLE')).toBe(JobLevel.MIDDLE);

    // enumName은 static 클래스명이 반환된다
    expect(JobLevel.MIDDLE.enumName).toBe('MIDDLE');

    // find는 람다표현식으로 EClass들 사이에서 원하는 대상을 하나 찾을 수 있다.
    expect(JobLevel.find((e) => e.name === '미들')).toBe(JobLevel.MIDDLE);

    // filter는 람다표현식으로 EClass들 사이에서 원하는 대상들 여러개를 찾을 수 있다.
    expect(
      JobLevel.filter((e) => e.name === '주니어' || e.name === '미들'),
    ).toStrictEqual([JobLevel.JUNIOR, JobLevel.MIDDLE]);
  });
});
