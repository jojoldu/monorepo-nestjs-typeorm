import { Enum, EnumType } from 'ts-jenum';

@Enum('_code') // id (여기서는 _code를 id값으로 사용)
export class UserStatus extends EnumType<UserStatus>() {
  static readonly READY = new UserStatus('READY', '미인증');
  static readonly ACTIVE = new UserStatus('ACTIVE', '활성');
  static readonly INACTIVE = new UserStatus('INACTIVE', '비활성');

  constructor(readonly _code: string, readonly _name: string) {
    super();
  }

  get code(): string {
    return this.enumName;
  }

  get name(): string {
    return this._name;
  }
}
