import { EJobLevel } from '@app/entity/domain/job/EJobLevel';

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
});
