import { ICodeName } from '@app/entity/domain/ICodeName';
import { Expose } from 'class-transformer';

export class EnumCodeName<T extends ICodeName> {
  private readonly _code: string;
  private readonly _name: string;

  constructor(e: T) {
    this._code = e.code;
    this._name = e.name;
  }

  @Expose()
  get code(): string {
    return this._code;
  }

  @Expose()
  get name(): string {
    return this._name;
  }
}
