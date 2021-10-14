import { Enum, EnumType } from 'ts-jenum';
import { ICodeName } from '@app/entity/enum/ICodeName';

@Enum('_code') // id (여기서는 _code를 id값으로 사용)
export class UserStatus extends EnumType<UserStatus>() implements ICodeName {
  static readonly READY = new UserStatus('READY', '미인증');
  static readonly ACTIVE = new UserStatus('ACTIVE', '활성');
  static readonly INACTIVE = new UserStatus('INACTIVE', '비활성');

  constructor(readonly _code: string, readonly _name: string) {
    super();
  }

  get code(): string {
    return this._code;
  }

  get name(): string {
    return this._name;
  }
}
