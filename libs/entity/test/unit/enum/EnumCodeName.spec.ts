import { UserStatus } from '@app/entity/domain/user/type/UserStatus';
import { EnumCodeName } from '@app/entity/enum/EnumCodeName';

describe('EnumCodeName', () => {
  it('ICodeName 의 구현체는 EnumCodeName으로 치환될 수 있다.', () => {
    const ready = UserStatus.READY;

    const result = new EnumCodeName(ready);

    expect(result.code).toBe('READY');
    expect(result.name).toBe('미인증');
  });

  it('EnumType의 values로 모든 값을 EnumCodeName으로 변경가능하다', () => {
    const result = UserStatus.values().map((e) => new EnumCodeName(e));

    expect(result).toHaveLength(3);
  });
});
