import { UserStatus } from '@app/entity/domain/user/type/UserStatus';

describe('UserStatus', () => {
  it('values()는 모든 대상을 반환한다', () => {
    const values = UserStatus.values();

    expect(values).toHaveLength(3);
    expect(values[0]).toBe(UserStatus.READY);
    expect(values[1]).toBe(UserStatus.ACTIVE);
    expect(values[2]).toBe(UserStatus.INACTIVE);
  });

  it('find는 문자열로 해당 Enum 객체를 반환한다', () => {
    const value = UserStatus.find('READY');

    expect(value).toBe(UserStatus.READY);
  });

  it('enumName은 문자열이 반환된다', () => {
    expect(UserStatus.READY.enumName).toBe('READY');
  });
});
