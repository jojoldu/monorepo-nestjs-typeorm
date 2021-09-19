import { LocalDate } from 'js-joda';

describe('js-joda', () => {
  it('js-joda', () => {
    const now = LocalDate.now();
    const after = now.plusDays(1);
    const before = now.minusDays(1);

    console.log(`now=${now}, after=${after}, before=${before}`);
    expect(now.isBefore(after)).toBeTruthy();
    expect(now.isEqual(after)).toBeFalsy();
    expect(now.isAfter(before)).toBeTruthy();
  });
});
