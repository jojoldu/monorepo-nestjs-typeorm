import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class UserStatus extends EnumType<UserStatus>() {
  static readonly READY = new UserStatus('READY', '미인증');
  static readonly ACTIVE = new UserStatus('ACTIVE', '활성');
  static readonly INACTIVE = new UserStatus('INACTIVE', '비활성');

  constructor(readonly code: string, readonly description: string) {
    super();
  }
}
