import { EJobLevel } from '@app/entity/domain/job/EJobLevel';
import { JobLevel } from '@app/entity/domain/job/JobLevel';

describe('EJobLevel', () => {
  it.each([
    [0, '인턴/신입'],
    [1, '주니어'],
    [5, '미들'],
    [11, '시니어'],
  ])('연차 %s인 경우 역량 등급은 %s이다', (year, grade) => {
    const result = EJobLevel.findByYear(Number(year));

    expect(result.name).toBe(grade);
  });

  it('ts-jenum 기본 케이스 검증', () => {
    // toString은 @Enum() 에 선언된 필드를 사용한다
    expect('' + EJobLevel.IRRELEVANT).toBe(EJobLevel.IRRELEVANT.code);

    // values() 는 전체 EClass를 반환한다
    expect(EJobLevel.values()).toStrictEqual([
      EJobLevel.IRRELEVANT,
      EJobLevel.BEGINNER,
      EJobLevel.JUNIOR,
      EJobLevel.MIDDLE,
      EJobLevel.SENIOR,
    ]);

    // valueOf는 @Enum() 에 선언된 필드를 통해 찾을 수 있다
    expect(EJobLevel.valueOf(JobLevel.MIDDLE)).toBe(EJobLevel.MIDDLE);

    // valueByName 는 실제 static 클래스이름으로 찾을 수 있다
    expect(EJobLevel.valueByName('MIDDLE')).toBe(EJobLevel.MIDDLE);

    // enumName은 static 클래스명이 반환된다
    expect(EJobLevel.MIDDLE.enumName).toBe('MIDDLE');

    // find는 람다표현식으로 EClass들 사이에서 원하는 대상을 하나 찾을 수 있다.
    expect(EJobLevel.find((e) => e.name === '미들')).toBe(EJobLevel.MIDDLE);

    // filter는 람다표현식으로 EClass들 사이에서 원하는 대상들 여러개를 찾을 수 있다.
    expect(
      EJobLevel.filter((e) => e.name === '주니어' || e.name === '미들'),
    ).toStrictEqual([EJobLevel.JUNIOR, EJobLevel.MIDDLE]);
  });
});
